import { FC } from 'react'
import styles from './Main.module.css'

type AvatarProps = {
  avatarColor: string
}

export const GroupAvatar: FC<AvatarProps> = ({ avatarColor }) => {
  return (
    <div
      className={styles['avatar']}
      style={{ '--avatar_color': avatarColor } as React.CSSProperties}
    />
  )
}
