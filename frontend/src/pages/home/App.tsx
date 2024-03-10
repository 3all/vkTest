import { Div, Group, Title, SubnavigationButton } from '@vkontakte/vkui'
import styles from './App.module.css'
import { useGetGroups } from '../../api/groups'
import { useRef, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { GroupItem } from '../../components/Main/GroupItem'
import { Icon24Filter } from '@vkontakte/icons'
import { Modal } from './Modal'
import {
  GlobalFilterStateType,
  initialFilterState,
} from '../../utils/filterState'
import useFilteredGroups from '../../hooks/useFilteredGroups'

function HomePage() {
  const { data: groupsData, isLoading, error } = useGetGroups()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filterState, setFilterState] =
    useState<GlobalFilterStateType>(initialFilterState)

  const parentRef = useRef<HTMLDivElement>(null)

  const filteredData = useFilteredGroups(groupsData?.data || [], filterState)

  const rowVirtualizer = useVirtualizer({
    count: filteredData.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 108,
    overscan: Math.max(filteredData.length - 6, 0),
  })

  const items = rowVirtualizer.getVirtualItems()

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const getUniqueAvatarColors = (): string[] => {
    if (groupsData?.data && Array.isArray(groupsData.data)) {
      const uniqueColors = new Set<string>(
        groupsData.data
          .map((group) => group.avatar_color)
          .filter((color): color is string => color !== undefined)
      )

      return Array.from(uniqueColors.add('gray'))
    }

    return []
  }

  return (
    <div className={styles['container']}>
      <Div className={styles['container__fixator']}>
        <Group
          className={styles['container__group']}
          header={
            <SubnavigationButton
              before={<Icon24Filter />}
              expandable
              onClick={toggleModal}
            >
              Фильтры
            </SubnavigationButton>
          }
        >
          {isLoading && <Title>Загрузка...</Title>}

          {isLoading === false && groupsData?.data === undefined && (
            <Title>Данные пришли пустыми :( {error?.message}</Title>
          )}

          {groupsData?.data && groupsData.result === 1 && (
            <div
              className={styles['container__virtualizer-container']}
              ref={parentRef}
              style={{
                width: '100%',
                height: 600,
                overflow: 'auto',
                contain: 'strict',
              }}
            >
              <div
                style={{
                  height: `${rowVirtualizer.getTotalSize()}px`,
                  width: '100%',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${items[0]?.start ?? 0}px)`,
                  }}
                ></div>
                {items.map((virtualItem, index) => (
                  <GroupItem
                    key={index}
                    virtualItem={virtualItem}
                    groupInfo={
                      filteredData !== undefined
                        ? filteredData[index]
                        : // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
                          groupsData.data?.[index]!
                    }
                    measureElement={rowVirtualizer.measureElement}
                  />
                ))}
              </div>
            </div>
          )}
        </Group>

        {Modal({
          title: 'Фильтры',
          isModalOpen: isModalOpen,
          toggleModal: toggleModal,
          uniqueAvatarColors: getUniqueAvatarColors(),
          initialState: filterState,
          onSubmit: (newFilterState: GlobalFilterStateType) =>
            setFilterState(newFilterState),
        })}
      </Div>
    </div>
  )
}

export default HomePage
