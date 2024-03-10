import {
  Button,
  Checkbox,
  FormLayoutGroup,
  ModalPage,
  ModalPageHeader,
  ModalRoot,
  PanelHeaderClose,
} from '@vkontakte/vkui'
import { FC, useState } from 'react'
import styles from './App.module.css'
import { GlobalFilterStateType } from '../../utils/filterState'

type ModalProps = {
  title: string
  isModalOpen: boolean
  toggleModal: () => void
  uniqueAvatarColors: string[]
  initialState: GlobalFilterStateType
  onSubmit: (newFilterState: GlobalFilterStateType) => void
}

export const Modal: FC<ModalProps> = ({
  title,
  isModalOpen,
  toggleModal,
  uniqueAvatarColors,
  initialState,
  onSubmit,
}) => {
  const [filterIsPrivate, setFilterIsPrivate] = useState(
    initialState.filterIsPrivate
  )

  const [filterIsPublic, setFilterIsPublic] = useState(
    initialState.filterIsPublic
  )

  const [filterAvatarColor, setFilterAvatarColor] = useState<string[]>(
    initialState.filterAvatarColor
  )

  const [filterHasFriends, setFilterHasFriends] = useState(
    initialState.filterHasFriends
  )

  return (
    <ModalRoot
      activeModal={isModalOpen ? 'filters' : null}
      onClose={toggleModal}
    >
      <ModalPage
        id='filters'
        onClose={toggleModal}
        header={
          <ModalPageHeader before={<PanelHeaderClose onClick={toggleModal} />}>
            {title}
          </ModalPageHeader>
        }
      >
        <FormLayoutGroup className={styles['modal']}>
          <Checkbox
            checked={filterIsPrivate}
            onChange={(e) => {
              setFilterIsPrivate(e.currentTarget.checked)
              if (filterIsPublic) setFilterIsPublic(false)
            }}
          >
            Приватная группа
          </Checkbox>

          <Checkbox
            checked={filterIsPublic}
            onChange={(e) => {
              setFilterIsPublic(e.currentTarget.checked)
              if (filterIsPrivate) setFilterIsPrivate(false)
            }}
          >
            Открытая группа
          </Checkbox>

          {uniqueAvatarColors.map((color: string) => {
            return (
              <Checkbox
                key={color}
                value={color}
                checked={filterAvatarColor.includes(color)}
                onChange={(e) => {
                  if (e.currentTarget.checked) {
                    setFilterAvatarColor([
                      ...filterAvatarColor,
                      e.currentTarget.value,
                    ])
                  } else {
                    setFilterAvatarColor(
                      filterAvatarColor.filter(
                        (color) => color !== e.currentTarget.value
                      )
                    )
                  }
                }}
              >
                {color}
              </Checkbox>
            )
          })}

          <Checkbox
            checked={filterHasFriends}
            onChange={(e) => setFilterHasFriends(e.currentTarget.checked)}
          >
            Есть друзья
          </Checkbox>

          <Button
            size='m'
            stretched
            onClick={() => {
              onSubmit({
                filterIsPrivate,
                filterIsPublic,
                filterAvatarColor,
                filterHasFriends,
              })
              toggleModal()
            }}
          >
            Применить
          </Button>
        </FormLayoutGroup>
      </ModalPage>
    </ModalRoot>
  )
}
