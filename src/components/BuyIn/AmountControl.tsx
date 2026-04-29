import { useMemo, useState } from 'react'
import styles from './AmountControl.module.scss'
import { clampNumber, formatMoneyAmount, parseNumberOrNull } from './utils'

type Props = {
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
}

export function AmountControl({ value, onChange, min, max, step = 0.5 }: Props) {
  const [raw, setRaw] = useState(() => String(value))
  const pct = useMemo(() => {
    const denom = max - min
    if (denom <= 0) return 0
    return ((value - min) / denom) * 100
  }, [max, min, value])

  const displayed = useMemo(() => {
    if (raw.trim() === '') return ''
    return raw
  }, [raw])

  const commit = (nextRaw: string) => {
    const n = parseNumberOrNull(nextRaw)
    if (n === null) return
    const clamped = clampNumber(n, min, max)
    onChange(clamped)
    setRaw(String(clamped))
  }

  const setClamped = (n: number) => {
    const clamped = clampNumber(n, min, max)
    onChange(clamped)
    setRaw(String(clamped))
  }

  return (
    <div className={styles.grid}>
      <div className={styles.top}>
        <button type="button" className={styles.chip} onClick={() => setClamped(min)}>
          Min ${formatMoneyAmount(min)}
        </button>

        <div className={styles.inputWrap}>
          <div className={styles.label}>Amount</div>
          <span className={styles.prefix} aria-hidden="true">
            $
          </span>
          <input
            className={styles.input}
            inputMode="decimal"
            value={displayed}
            onChange={(e) => {
              const nextRaw = e.target.value
              const prevRaw = raw
              setRaw(nextRaw)
              if (nextRaw.trim() === '') return
              if (/[.,]$/.test(nextRaw.trim())) return
              const n = parseNumberOrNull(nextRaw)
              if (n === null) return

              if (n < min && nextRaw.length < prevRaw.length) return

              const clamped = clampNumber(n, min, max)
              onChange(clamped)
              if (clamped !== n) setRaw(String(clamped))
            }}
            onBlur={() => {
              if (raw.trim() === '') setRaw(String(value))
              else commit(raw)
            }}
            aria-label="Amount"
          />
        </div>

        <button type="button" className={styles.chip} onClick={() => setClamped(max)}>
          Max ${formatMoneyAmount(max)}
        </button>
      </div>

      <input
        className={styles.range}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={{ ['--pct' as never]: `${pct}%` }}
        onChange={(e) => {
          const n = Number(e.target.value)
          onChange(n)
          setRaw(String(n))
        }}
        aria-label="Amount slider"
      />
    </div>
  )
}

