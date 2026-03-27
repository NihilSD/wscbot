module.exports = async function(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  const key = process.env.CLAUDE_API_KEY;
  res.json({
    key_set: !!key,
    key_preview: key ? key.slice(0, 20) + '...' : 'MISSING',
    node_version: process.version
  });
};

