export type MedicalInfoType =
  | 'article'
  | 'prescription'
  | 'lab'
  | 'visit'
  | 'note'

export interface MedicalInfo {
  id: string
  type: MedicalInfoType
  title: string
  content: string
  timestamp: Date
  doctorId: string
  doctorName: string
  severity?: 'low' | 'medium' | 'high'
  metadata?: {
    dosage?: string
    frequency?: string
    duration?: string
    sideEffects?: string[]
    articleUrl?: string
    articleSource?: string
    tags?: string[]
  }
}
