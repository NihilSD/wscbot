module.exports = async function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const key = process.env.CLAUDE_API_KEY;
  
  // Actually test the key against Anthropic
  let anthropicTest = null;
  if (key) {
    try {
      const r = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': key,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: 'claude-sonnet-4-6',
          max_tokens: 10,
          messages: [{ role: 'user', content: 'hi' }]
        })
      });
      const d = await r.json();
      anthropicTest = { status: r.status, type: d.type, error: d.error?.message };
    } catch(e) {
      anthropicTest = { error: e.message };
    }
  }
 
  res.json({
    key_set: !!key,
    key_length: key?.length,
    key_start: key?.slice(0, 24),
    key_end: key?.slice(-8),
    anthropic_test: anthropicTest,
    node_version: process.version
  });
};
 
