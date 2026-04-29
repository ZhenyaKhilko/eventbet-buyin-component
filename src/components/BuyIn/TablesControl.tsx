import cn from 'classnames'
import { useMemo, useState } from 'react'
import styles from './TablesControl.module.scss'
import { parseNumberOrNull } from './utils'

type Props = {
  value: number
  onChange: (value: number) => void
  min?: number
}

export function TablesControl({ value, onChange, min = 1 }: Props) {
  const [raw, setRaw] = useState(() => String(value))

  const displayed = useMemo(() => {
    if (raw.trim() === '') return ''
    return raw
  }, [raw])

  const commit = (nextRaw: string) => {
    const n = parseNumberOrNull(nextRaw)
    if (n === null) return
    const intVal = Math.max(min, Math.trunc(n))
    onChange(intVal)
    setRaw(String(intVal))
  }

  const canDec = value > min

  return (
    <div className={styles.root}>
      <button
        type="button"
        className={cn(styles.btn, !canDec && styles.btnDisabled)}
        onClick={() => {
          if (!canDec) return
          const next = value - 1
          onChange(next)
          setRaw(String(next))
        }}
        aria-label="Decrease number of tables"
        disabled={!canDec}
      >
        <span className={styles.iconMinus} aria-hidden="true" />
      </button>

      <div className={styles.inputWrap}>
        <div className={styles.label}>Number of tables</div>
        <input
          className={styles.input}
          inputMode="numeric"
          value={displayed}
          onChange={(e) => setRaw(e.target.value.replace(/[^\d]/g, ''))}
          onBlur={() => {
            if (raw.trim() === '') setRaw(String(value))
            else commit(raw)
          }}
          aria-label="Number of tables"
        />
      </div>

      <button
        type="button"
        className={styles.btn}
        onClick={() => {
          const next = value + 1
          onChange(next)
          setRaw(String(next))
        }}
        aria-label="Increase number of tables"
      >
        <span className={styles.iconPlus} aria-hidden="true" />
      </button>
    </div>
  )
}

