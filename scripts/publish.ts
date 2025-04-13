import { connect, StringCodec } from 'nats';

async function main() {
  const args = process.argv.slice(2);
  const content = args.join(' ').trim();

  if (!content) {
    console.error('Usage: pnpm tsx send.ts "Your message content here"');
    process.exit(1);
  }

  const nc = await connect({ servers: ['nats://127.0.0.1:4222'] });
  const sc = StringCodec();

  const payload = {
    content: content,
    timestamp: new Date().toISOString(),
  };

  const subject = 'general';
  nc.publish(subject, sc.encode(JSON.stringify(payload)));

  console.log(`✅ Published to "${subject}":`, payload);
  await nc.flush();
  await nc.close();
}

main().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
