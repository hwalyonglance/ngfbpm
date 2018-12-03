export interface IAccount {
	uid: string
	photoURL: string
	displayName: string
	email: string
	emailVerified: boolean
	phoneNumber: string
	createdAt: Date | number
	updatedAt: Date | number
}
