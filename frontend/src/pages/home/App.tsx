import {
  Div,
  Group,
  Title,
  ModalRoot,
  ModalPage,
  ModalPageHeader,
  Checkbox,
  FormLayoutGroup,
  Button,
  PanelHeaderClose,
  SubnavigationButton,
} from '@vkontakte/vkui'
import styles from './App.module.css'
import { useGetGroups } from '../../api/groups'
import { useRef, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { GroupItem } from '../../components/Main/GroupItem'
import { Icon24Filter } from '@vkontakte/icons'
import { Group as GroupType } from '../../../../shared/src/apiSchema'

type BooleanFilterTypes = 'isPrivate' | 'isPublic' | 'hasFriends'
type ComplexFilterTypes = {
  name: 'avatarColor'
  value: string
  checked: boolean
}

function HomePage() {
  const { data: groupsData, isLoading, error } = useGetGroups()
  const [filteredData, setFilteredData] = useState<undefined | GroupType[]>(
    undefined
  )

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filterIsPrivate, setFilterIsPrivate] = useState(false)
  const [filterIsPublic, setFilterIsPublic] = useState(false)
  const [filterAvatarColor, setFilterAvatarColor] = useState<string[]>([])
  const [filterHasFriends, setFilterHasFriends] = useState(false)
  const parentRef = useRef<HTMLDivElement>(null)

  let virtualizerCount = 0
  if (filteredData && filteredData.length > 0) {
    virtualizerCount = filteredData.length
  } else if (groupsData && groupsData.data && groupsData.data.length > 0) {
    virtualizerCount = groupsData.data.length
  }

  let overscanValue = 0
  if (virtualizerCount === 0) {
    overscanValue = 1
  } else {
    overscanValue = Math.max(virtualizerCount - 6, 0)
  }

  const rowVirtualizer = useVirtualizer({
    count: virtualizerCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 108,
    overscan: overscanValue,
  })

  const items = rowVirtualizer.getVirtualItems()
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen)
  }

  const onBooleanFilterChange = (
    filter: BooleanFilterTypes,
    value: boolean
  ) => {
    switch (filter) {
      case 'isPrivate':
        setFilterIsPrivate(value)
        if (filterIsPublic) {
          setFilterIsPublic(!value)
        }
        break

      case 'isPublic':
        setFilterIsPublic(value)
        if (filterIsPrivate) {
          setFilterIsPrivate(!value)
        }
        break

      case 'hasFriends':
        setFilterHasFriends(value)
        break
      default:
        break
    }
  }

  const onComplexFilterChange = (filter: ComplexFilterTypes) => {
    switch (filter.name) {
      case 'avatarColor':
        if (filter.checked) {
          setFilterAvatarColor([...filterAvatarColor, filter.value])
        } else {
          setFilterAvatarColor(
            filterAvatarColor.filter((color) => color !== filter.value)
          )
        }
        break
      default:
        break
    }
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

  const onFilterSubmit = () => {
    let filteredGroups = groupsData?.data

    if (filterIsPrivate) {
      filteredGroups = filteredGroups?.filter((group) => group.closed)
    }

    if (filterIsPublic) {
      filteredGroups = filteredGroups?.filter((group) => !group.closed)
    }

    if (filterAvatarColor.length !== 0) {
      filteredGroups = filteredGroups?.filter((group) =>
        filterAvatarColor.includes(group.avatar_color || 'gray')
      )
    }

    if (filterHasFriends) {
      filteredGroups = filteredGroups?.filter(
        (group) => group.friends && group.friends.length > 0
      )
    }

    console.log('Filtered Groups:', filteredGroups)
    setFilteredData(filteredGroups)
  }

  const modal = (
    <ModalRoot
      activeModal={isModalOpen ? 'filters' : null}
      onClose={toggleModal}
    >
      <ModalPage
        id='filters'
        onClose={toggleModal}
        header={
          <ModalPageHeader before={<PanelHeaderClose onClick={toggleModal} />}>
            Фильтры
          </ModalPageHeader>
        }
      >
        <FormLayoutGroup className={styles['modal']}>
          <Checkbox
            checked={filterIsPrivate}
            onChange={(e) =>
              onBooleanFilterChange('isPrivate', e.currentTarget.checked)
            }
          >
            Приватная группа
          </Checkbox>

          <Checkbox
            checked={filterIsPublic}
            onChange={(e) =>
              onBooleanFilterChange('isPublic', e.currentTarget.checked)
            }
          >
            Открытая группа
          </Checkbox>

          {getUniqueAvatarColors().map((color: string) => {
            return (
              <Checkbox
                key={color}
                value={color}
                checked={filterAvatarColor.includes(color)}
                onChange={(e) =>
                  onComplexFilterChange({
                    name: 'avatarColor',
                    value: e.currentTarget.value,
                    checked: e.currentTarget.checked,
                  })
                }
              >
                {color}
              </Checkbox>
            )
          })}

          <Checkbox
            checked={filterHasFriends}
            onChange={(e) =>
              onBooleanFilterChange('hasFriends', e.currentTarget.checked)
            }
          >
            Есть друзья
          </Checkbox>

          <Button
            size='m'
            stretched
            onClick={() => {
              onFilterSubmit()
              toggleModal()
            }}
          >
            Применить
          </Button>
        </FormLayoutGroup>
      </ModalPage>
    </ModalRoot>
  )

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
          {isLoading ? <Title>Загрузка...</Title> : null}

          {isLoading === false && groupsData?.data === undefined ? (
            <Title>Данные пришли пустыми :( {error?.message}</Title>
          ) : null}

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
        {modal}
      </Div>
    </div>
  )
}

export default HomePage
