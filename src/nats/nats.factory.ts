import { ApiConfigService } from 'src/config/config.service';
import NATS from 'nats';

export const natsFactory = async (config: ApiConfigService) => {
  const client = await NATS.connect({
    servers: [config.natsConfig.url],
  });
  return client;
};
