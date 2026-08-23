const fs = require('fs');

['components/variables/PatternsScene.tsx', 'components/variables/SandboxScene.tsx'].forEach(fp => {
  let c = fs.readFileSync(fp, 'utf8');
  // Replace literal \` with `
  c = c.split('\\`').join('`');
  // Replace literal \$ with $  
  c = c.split('\\$').join('$');
  fs.writeFileSync(fp, c);
  console.log('Fixed:', fp);
});
