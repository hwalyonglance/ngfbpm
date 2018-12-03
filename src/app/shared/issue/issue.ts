import { IAccount } from '../accounts'

export interface IIssue {
	uid: string
	title: string
	posterUid: string
	poster: IAccount
	state: 'TO_DO' | 'IN_PROGRESS' | 'QA' | 'DONE'
	asigneesUid: string[]
	asignees: IAccount[]
	labels: string[]
	hidden: boolean
	createdAt: Date | number
	updatedAt: Date | number
}
