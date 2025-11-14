import { useState } from 'react';
import { Copy, RefreshCw, Check, Shield } from 'lucide-react';

function App() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = '';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (charset === '') {
      setPassword('Please select at least one option');
      return;
    }

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    if (password && !password.includes('Please select')) {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getStrength = () => {
    if (!password || password.includes('Please select')) return { text: '', color: '', width: '0%' };

    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (password.length >= 16) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;

    if (strength <= 2) return { text: 'Weak', color: 'bg-red-500', width: '33%' };
    if (strength <= 4) return { text: 'Medium', color: 'bg-yellow-500', width: '66%' };
    return { text: 'Strong', color: 'bg-green-500', width: '100%' };
  };

  const strength = getStrength();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Password Generator</h1>
          <p className="text-slate-400">Create secure passwords instantly</p>
        </div>

        <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
          <div className="mb-6">
            <div className="bg-slate-900 rounded-xl p-4 border border-slate-700 mb-3">
              <div className="flex items-center justify-between gap-3">
                <input
                  type="text"
                  value={password}
                  readOnly
                  placeholder="Your password will appear here"
                  className="flex-1 bg-transparent text-white text-lg font-mono outline-none"
                />
                <button
                  onClick={copyToClipboard}
                  disabled={!password || password.includes('Please select')}
                  className="p-2 hover:bg-slate-700 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                  title="Copy to clipboard"
                >
                  {copied ? (
                    <Check className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-slate-400" />
                  )}
                </button>
              </div>
            </div>

            {password && !password.includes('Please select') && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Strength</span>
                  <span className={`font-semibold ${
                    strength.text === 'Weak' ? 'text-red-500' :
                    strength.text === 'Medium' ? 'text-yellow-500' :
                    'text-green-500'
                  }`}>
                    {strength.text}
                  </span>
                </div>
                <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${strength.color} transition-all duration-300`}
                    style={{ width: strength.width }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-slate-300">
                Length: <span className="text-blue-400">{length}</span>
              </label>
            </div>
            <input
              type="range"
              min="4"
              max="32"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>4</span>
              <span>32</span>
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-700 cursor-pointer hover:border-slate-600 transition-colors">
              <span className="text-slate-300">Uppercase Letters (A-Z)</span>
              <input
                type="checkbox"
                checked={includeUppercase}
                onChange={(e) => setIncludeUppercase(e.target.checked)}
                className="w-5 h-5 rounded accent-blue-600 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-700 cursor-pointer hover:border-slate-600 transition-colors">
              <span className="text-slate-300">Lowercase Letters (a-z)</span>
              <input
                type="checkbox"
                checked={includeLowercase}
                onChange={(e) => setIncludeLowercase(e.target.checked)}
                className="w-5 h-5 rounded accent-blue-600 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-700 cursor-pointer hover:border-slate-600 transition-colors">
              <span className="text-slate-300">Numbers (0-9)</span>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-5 h-5 rounded accent-blue-600 cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-700 cursor-pointer hover:border-slate-600 transition-colors">
              <span className="text-slate-300">Symbols (!@#$%^&*)</span>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-5 h-5 rounded accent-blue-600 cursor-pointer"
              />
            </label>
          </div>

          <button
            onClick={generatePassword}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30"
          >
            <RefreshCw className="w-5 h-5" />
            Generate Password
          </button>
        </div>

        <div className="text-center mt-6 text-sm text-slate-500">
          <p>Your password is generated locally and never sent to any server</p>
        </div>
      </div>
    </div>
  );
}

export default App;
