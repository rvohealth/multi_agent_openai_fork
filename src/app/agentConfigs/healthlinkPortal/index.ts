import doctor from './doctor'
import serviceDesk from './serviceDesk'
import article from './article'
import { injectTransferTools } from '../utils'

// Connect all agents to each other
doctor.downstreamAgents = [serviceDesk]
serviceDesk.downstreamAgents = [doctor, article]
// articles.downstreamAgents = [doctor, serviceDesk]

// Add transfer tools to all agents
const agents = injectTransferTools([serviceDesk, doctor, article])

export default agents
