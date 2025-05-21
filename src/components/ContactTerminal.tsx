'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

interface ContactTerminalProps {
  hideHeader?: boolean;
  closeWindow?: () => void;
}

const ContactTerminal: React.FC<ContactTerminalProps> = ({ hideHeader = false, closeWindow }) => {
  const [stage, setStage] = useState<'init' | 'email' | 'message' | 'confirm' | 'sending' | 'success' | 'error'>('init');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  // EmailJS configuration
  const EMAILJS_SERVICE_ID = 'service_cldfcwi'; // Utilisez l'ID de service que vous obtenez de votre tableau de bord EmailJS
  const EMAILJS_TEMPLATE_ID = 'template_kovlzye'; // Utilisez l'ID de template que vous obtenez de votre tableau de bord EmailJS
  const EMAILJS_PUBLIC_KEY = '7LgFFy5JJVhonUnPm'; // Sera remplacé par celui dans EmailJSInitializer

  useEffect(() => {
    // Blinking cursor effect
    const interval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Initial boot sequence
    setHistory([
      'Initialisation du Terminal v2.0.0...',
      'Système de Contact en démarrage...',
      'Tapez "aide" pour voir les commandes ou "start" pour commencer.'
    ]);
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom of terminal
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    // Focus input on load
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      setStage('sending');
      addToHistory('Envoi du message en cours...');
      
      if (!formRef.current) {
        throw new Error("Formulaire non disponible");
      }
      
      // Using FormData approach for more reliable EmailJS sending
      const formData = new FormData();
      formData.append('from_name', email);
      formData.append('from_email', email);
      formData.append('to_email', 'paul.mehr68@gmail.com');
      formData.append('message', message);
      
      // Convert FormData to object
      const templateParams = Object.fromEntries(formData);
      
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams
      );
      
      console.log('Email sent successfully:', result);
      setStage('success');
      addToHistory('Message envoyé avec succès!');
      addToHistory('Merci de m\'avoir contacté. Je vous répondrai bientôt.');
      addToHistory('Tapez "reset" pour recommencer ou "exit" pour fermer.');
    } catch (error) {
      console.error('Error sending message:', error);
      setStage('error');
      addToHistory('ERREUR: Échec de l\'envoi du message. Veuillez réessayer plus tard.');
      addToHistory('Tapez "reset" pour réessayer ou "exit" pour fermer.');
    } finally {
      setIsLoading(false);
    }
  };

  const addToHistory = (text: string) => {
    setHistory(prev => [...prev, text]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      processInput();
    }
  };

  const processInput = () => {
    const currentInput = input.trim();
    
    // Add user input to history
    addToHistory(`> ${currentInput}`);
    setInput('');

    // Process commands
    switch (stage) {
      case 'init':
        handleInitCommands(currentInput);
        break;
      case 'email':
        handleEmailInput(currentInput);
        break;
      case 'message':
        handleMessageInput(currentInput);
        break;
      case 'confirm':
        handleConfirmInput(currentInput);
        break;
      case 'success':
      case 'error':
        handleFinalCommands(currentInput);
        break;
    }
  };

  const handleInitCommands = (cmd: string) => {
    switch (cmd.toLowerCase()) {
      case 'start':
        setStage('email');
        addToHistory('Veuillez entrer votre adresse email:');
        break;
      case 'aide':
      case 'help':
        addToHistory('Commandes disponibles:');
        addToHistory('  start  - Commencer le processus de contact');
        addToHistory('  aide   - Afficher ce message d\'aide');
        addToHistory('  clear  - Effacer l\'historique du terminal');
        break;
      case 'clear':
        setHistory([]);
        break;
      case 'exit':
        if (closeWindow) {
          addToHistory('Fermeture du terminal...');
          setTimeout(() => closeWindow(), 1000);
        } else {
          addToHistory('Commande disponible uniquement en mode bureau.');
        }
        break;
      default:
        addToHistory(`Commande non reconnue: "${cmd}"`);
        addToHistory('Tapez "aide" pour voir les commandes disponibles.');
    }
  };

  const handleEmailInput = (input: string) => {
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(input)) {
      setEmail(input);
      setStage('message');
      addToHistory('Email accepté.');
      addToHistory('Veuillez entrer votre message:');
    } else {
      addToHistory('Format d\'email invalide. Veuillez réessayer:');
    }
  };

  const handleMessageInput = (input: string) => {
    if (input.length < 10) {
      addToHistory('Message trop court. Veuillez fournir plus de détails:');
      return;
    }

    setMessage(input);
    setStage('confirm');
    addToHistory('Message reçu.');
    addToHistory('Veuillez vérifier vos informations:');
    addToHistory(`Email: ${email}`);
    addToHistory(`Message: ${input}`);
    addToHistory('Tapez "envoyer" pour confirmer ou "modifier" pour faire des changements.');
  };

  const handleConfirmInput = (input: string) => {
    switch (input.toLowerCase()) {
      case 'envoyer':
      case 'send':
        handleSubmit();
        break;
      case 'modifier':
      case 'edit':
        setStage('email');
        addToHistory('Modifions vos informations.');
        addToHistory('Veuillez entrer votre adresse email:');
        break;
      default:
        addToHistory('Veuillez taper "envoyer" pour confirmer ou "modifier" pour faire des changements.');
    }
  };

  const handleFinalCommands = (cmd: string) => {
    switch (cmd.toLowerCase()) {
      case 'reset':
        setStage('init');
        setEmail('');
        setMessage('');
        setHistory([
          'Terminal réinitialisé.',
          'Tapez "aide" pour voir les commandes ou "start" pour commencer.'
        ]);
        break;
      case 'exit':
        addToHistory('Fermeture du terminal...');
        if (closeWindow) {
          setTimeout(() => closeWindow(), 1000);
        } else {
          addToHistory('Merci de votre visite!');
        }
        break;
      default:
        addToHistory(`Commande non reconnue: "${cmd}"`);
        addToHistory('Tapez "reset" pour recommencer ou "exit" pour fermer.');
    }
  };

  return (
    <div className={`bg-black text-green-fluo ${!hideHeader ? 'pt-20' : ''} min-h-[unset]`}>
      {!hideHeader && (
        <div className="text-center mb-8">
          <h2 className="text-4xl font-marathon text-green-fluo mb-2">CONTACT</h2>
          <p className="text-sm text-white/70">Envoyez moi un message</p>
        </div>
      )}

      {/* Hidden form for EmailJS */}
      <form ref={formRef} className="hidden">
        <input type="text" name="from_name" value={email} readOnly />
        <input type="email" name="from_email" value={email} readOnly />
        <input type="email" name="to_email" value="paul.mehr68@gmail.com" readOnly />
        <textarea name="message" value={message} readOnly />
      </form>

      <div className={`${hideHeader ? '' : 'max-w-2xl mx-auto'}`}>
        <div 
          className="border-2 border-green-fluo rounded-lg bg-black p-4 h-[60vh]"
          style={{
            boxShadow: '0 0 15px rgba(192, 254, 4, 0.5), 0 0 30px rgba(192, 254, 4, 0.3)',
            height: hideHeader ? '100%' : '60vh'
          }}
        >
          {/* Terminal header */}
          <div className="flex items-center justify-between border-b border-green-fluo pb-2 mb-4">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-xs font-mono">contact_terminal.exe</div>
            <div></div>
          </div>

          {/* Terminal content */}
          <div 
            ref={terminalRef}
            className="font-mono text-sm overflow-y-auto pb-2 terminal-scrollbar"
            style={{
              height: hideHeader ? 'calc(100% - 40px)' : 'calc(60vh - 60px)'
            }}
          >
            {history.map((line, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mb-1"
              >
                {line}
              </motion.div>
            ))}
            
            {/* Input line */}
            <div className="flex items-start">
              <span className="mr-2">&gt;</span>
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="bg-transparent border-none outline-none w-full text-green-fluo font-mono"
                  autoFocus
                  disabled={isLoading}
                />
                <span 
                  className={`absolute h-4 w-2 bg-green-fluo ${cursorVisible ? 'opacity-100' : 'opacity-0'} transition-opacity`}
                  style={{ left: `${input.length * 0.6}em`, top: '2px' }}
                ></span>
              </div>
            </div>
          </div>
        </div>

        {/* Terminal instructions */}
        <div className="text-xs text-center mt-4 text-white/70 font-mono">
          <p>// TAPEZ "start" POUR COMMENCER</p>
          <p>// TAPEZ "aide" POUR L'AIDE</p>
        </div>
      </div>
    </div>
  );
};

export default ContactTerminal;
