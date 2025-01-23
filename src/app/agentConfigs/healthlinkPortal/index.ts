import doctor from './doctor';
import serviceDesk from './serviceDesk';
import { injectTransferTools } from '../utils';

doctor.downstreamAgents = [serviceDesk]
serviceDesk.downstreamAgents = [doctor]

const agents = injectTransferTools([serviceDesk, doctor]);

export default agents;