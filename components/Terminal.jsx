'use client';

import { useState, useRef, useEffect } from 'react';
import { executeCommand, getCommandSuggestions } from '@/lib/commands';
import { asciiArt } from '@/lib/ascii-art';
import AsciiArt from './AsciiArt';

export default function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);
  const outputEndRef = useRef(null);

  // Initialize with welcome message
  useEffect(() => {
    setHistory([{
      type: 'ascii',
      content: asciiArt.welcome,
      timestamp: Date.now()
    }]);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  // Focus input on mount and when clicking terminal
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    
    // Update suggestions for auto-complete
    if (value) {
      const suggs = getCommandSuggestions(value);
      setSuggestions(suggs);
    } else {
      setSuggestions([]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    // Add command to history
    const newHistory = [...history, {
      type: 'input',
      content: input,
      timestamp: Date.now()
    }];

    // Execute command
    const result = executeCommand(input);

    // Check if clear command
    if (result.clear) {
      setHistory([]);
      setInput('');
      setCommandHistory([...commandHistory, input]);
      setHistoryIndex(-1);
      setSuggestions([]);
      return;
    }

    // Add output to history
    if (result.output) {
      newHistory.push({
        type: 'output',
        content: result.output,
        timestamp: Date.now()
      });
    }

    // Add ASCII art to history
    if (result.ascii) {
      newHistory.push({
        type: 'ascii',
        content: result.ascii,
        timestamp: Date.now()
      });
    }

    setHistory(newHistory);
    setCommandHistory([...commandHistory, input]);
    setHistoryIndex(-1);
    setInput('');
    setSuggestions([]);
  };

  const handleKeyDown = (e) => {
    // Arrow Up - Previous command
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 
          ? commandHistory.length - 1 
          : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
        setSuggestions([]);
      }
    }
    
    // Arrow Down - Next command
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(commandHistory[newIndex]);
        }
        setSuggestions([]);
      }
    }

    // Tab - Auto-complete
    if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestions.length === 1) {
        setInput(suggestions[0]);
        setSuggestions([]);
      } else if (suggestions.length > 0) {
        // Cycle through suggestions
        const currentSuggestionIndex = suggestions.indexOf(input);
        const nextIndex = (currentSuggestionIndex + 1) % suggestions.length;
        setInput(suggestions[nextIndex]);
      }
    }
  };

  return (
    <div 
      ref={terminalRef}
      onClick={handleTerminalClick}
      className="min-h-screen bg-black text-green-400 font-mono p-4 cursor-text overflow-auto"
    >
      <div className="max-w-4xl mx-auto">
        {/* Terminal Output */}
        <div className="mb-4">
          {history.map((item, index) => (
            <div key={`${item.timestamp}-${index}`} className="mb-2">
              {item.type === 'input' && (
                <div className="flex items-start">
                  <span className="text-cyan-400 mr-2">visitor@portfolio:~$</span>
                  <span className="text-white">{item.content}</span>
                </div>
              )}
              {item.type === 'output' && (
                <pre className="whitespace-pre-wrap text-green-400 ml-0 text-sm">
                  {item.content}
                </pre>
              )}
              {item.type === 'ascii' && (
                <AsciiArt art={item.content} animate={true} />
              )}
            </div>
          ))}
          <div ref={outputEndRef} />
        </div>

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-cyan-400 mr-2 whitespace-nowrap">visitor@portfolio:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-white caret-green-400"
            spellCheck="false"
            autoComplete="off"
            autoFocus
          />
        </form>

        {/* Auto-complete suggestions */}
        {suggestions.length > 1 && (
          <div className="mt-2 text-gray-500 text-sm ml-40">
            Suggestions: {suggestions.join(', ')}
          </div>
        )}
      </div>
    </div>
  );
}
