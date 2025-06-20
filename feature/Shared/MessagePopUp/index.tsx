import React from 'react'
import { MdCheck } from 'react-icons/md'
import styles from './styles.module.scss'

const MessagePopUp = ({ content = 'Thank You!' }: { content?: string }) => {
	return (
		<div className={styles.container}>
			<div className={styles.check}>
				<MdCheck size={100} color='white' />
			</div>
			<h1>{content}</h1>
			<desc>
				User Will be notified. 
			</desc>
		</div>
	)
}

export default MessagePopUp
