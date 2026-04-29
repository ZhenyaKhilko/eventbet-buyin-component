import styles from './BalancesBox.module.scss'
import type { MoneyType } from './types'

type Props = {
  moneyType: MoneyType
  realBalance: number
  cashBalance: number
}

export function BalancesBox({ moneyType, realBalance, cashBalance }: Props) {
  const showCashRow = moneyType === 'cash'

  return (
    <div className={styles.root} aria-label="Balances">
      <div className={styles.row}>
        <div className={styles.label}>Real money:</div>
        <div className={styles.value}>${realBalance}</div>
      </div>

      {showCashRow && (
        <div className={styles.row}>
          <div className={styles.label}>Cash money:</div>
          <div className={`${styles.value} ${styles.cashValue}`}>C${cashBalance}</div>
        </div>
      )}
    </div>
  )
}

