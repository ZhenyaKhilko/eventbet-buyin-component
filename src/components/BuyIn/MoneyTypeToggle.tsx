import styles from './MoneyTypeToggle.module.scss'
import type { MoneyType } from './types'

type Props = {
  value: MoneyType
  onChange: (value: MoneyType) => void
}

export function MoneyTypeToggle({ value, onChange }: Props) {
  return (
    <div className={styles.root}>
      <div className={styles.radios} role="radiogroup" aria-label="Money type">
        <button type="button" className={styles.radio} onClick={() => onChange('real')}>
          <span className={value === 'real' ? `${styles.dot} ${styles.dotActive}` : styles.dot} aria-hidden="true" />
          <span className={styles.radioText}>Use real money</span>
        </button>

        <button type="button" className={`${styles.radio} ${styles.radioNoPadLeft}`} onClick={() => onChange('cash')}>
          <span className={value === 'cash' ? `${styles.dot} ${styles.dotActive}` : styles.dot} aria-hidden="true" />
          <span className={styles.radioText}>Use cash money</span>
        </button>
      </div>
    </div>
  )
}

