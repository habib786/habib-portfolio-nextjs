const { execSync } = require('child_process');
const PORT = 3000;

try {
  if (process.platform === 'win32') {
    execSync(`netstat -ano | findstr :${PORT}`, { stdio: 'pipe' });
    const output = execSync(`for /f "tokens=5" %a in ('netstat -ano ^| findstr :${PORT}') do @echo %a`, { shell: 'cmd.exe', stdio: 'pipe' });
    const pids = new Set(output.toString().split('\n').filter(Boolean));
    
    for (const pid of pids) {
      const trimmed = pid.trim();
      if (trimmed && /^\d+$/.test(trimmed)) {
        try {
          execSync(`taskkill /PID ${trimmed} /F`, { stdio: 'pipe' });
          console.log(`Killed process ${trimmed} on port ${PORT}`);
        } catch (e) {
        }
      }
    }
  } else {
    execSync(`lsof -ti:${PORT} | xargs kill -9 2>/dev/null || true`);
  }
} catch (e) {
}