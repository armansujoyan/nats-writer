import { ApiConfigService } from 'src/config/config.service';
import { connect } from 'nats';

export const natsFactory = async (config: ApiConfigService) => {
  const client = await connect({
    servers: [config.natsConfig.url],
  });
  return client;
};
