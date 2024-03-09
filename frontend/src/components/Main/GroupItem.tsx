import { FC, useState } from 'react'
import { VirtualItem } from '@tanstack/react-virtual'
import { Group, User } from '../../../../shared/src/apiSchema'
import { Caption, SimpleCell, Subhead, Text, Title } from '@vkontakte/vkui'
import { GroupAvatar } from './GroupAvatar'
import { FollowersInfo } from './FollowersInfo'
import styles from './Main.module.css'
import { parseNumber } from '../../utils/parseNumber'

type GroupItemProps = {
  virtualItem: VirtualItem
  groupInfo: Group
}

export const GroupItem: FC<GroupItemProps> = ({ virtualItem, groupInfo }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <>
      {groupInfo && (
        <div
          key={virtualItem.index}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: `${virtualItem.size}px`,
            transform: `translateY(${virtualItem.start}px)`,
            paddingBottom: 12,
          }}
        >
          <SimpleCell
            before={
              <GroupAvatar avatarColor={groupInfo.avatar_color || 'gray'} />
            }
            after={<FollowersInfo amount={groupInfo.members_count} />}
          >
            <div className={styles['main_info_container']}>
              <div className={styles['main_info_container__title']}>
                <Title>{groupInfo.name}</Title>
                <Subhead className={styles['main_info_container__subhead']}>
                  {groupInfo.closed ? 'Приватная группа' : 'Открытая группа'}
                </Subhead>
              </div>

              <Caption
                level='1'
                weight='1'
                onClick={() => setIsExpanded(!isExpanded)}
                className={styles['main_info_container__friends-amount']}
              >
                {parseNumber(groupInfo.friends?.length || 0, [
                  'твой друг',
                  'твоих друга',
                  'твоих друзей',
                ])}
              </Caption>

              <div className={styles['friend_list']}>
                {isExpanded &&
                  groupInfo.friends &&
                  groupInfo.friends.map((friend: User) => {
                    return (
                      <Text>
                        {friend.last_name} {friend.first_name},
                      </Text>
                    )
                  })}
              </div>
            </div>
          </SimpleCell>
        </div>
      )}
    </>
  )
}
