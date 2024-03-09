import { FC } from 'react'
import styles from './Main.module.css'
import { parseNumber } from '../../utils/parseNumber'

type FollowersInfoProps = {
  amount: number
}

export const FollowersInfo: FC<FollowersInfoProps> = ({ amount }) => {
  return (
    <div className={styles['followersInfo']}>
      <span>
        {parseNumber(amount, ['подписчик', 'подписчика', 'подписчиков'])}
      </span>
    </div>
  )
}
