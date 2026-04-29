import { useMemo, useState } from 'react'
import styles from './BuyIn.module.scss'
import { AmountControl } from './AmountControl'
import { BalancesBox } from './BalancesBox'
import { MoneyTypeToggle } from './MoneyTypeToggle'
import { TablesControl } from './TablesControl'
import { AvailableBalanceIcon } from './icons/AvailableBalanceIcon'
import { CardIcon } from './icons/CardIcon'
import { CloseIcon } from './icons/CloseIcon'
import { GameTypeIcon } from './icons/GameTypeIcon'
import type { MoneyType } from './types'
import { formatMoneyAmount } from './utils'

const AMOUNT_MIN = 0.5
const AMOUNT_MAX = 50

export function BuyIn() {
  const [moneyType, setMoneyType] = useState<MoneyType>('cash')
  const [amount, setAmount] = useState<number>(10)
  const [tables, setTables] = useState<number>(1)

  const chargeText = useMemo(() => `$${formatMoneyAmount(amount)}`, [amount])

  return (
    <div className={styles.overlay}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label="Buy-In">
        <div className={styles.header}>
          <div className={styles.headerGlow} />
          <div className={styles.titleFrame}>
            <div className={styles.title}>Buy-In</div>
          </div>
          <button type="button" className={styles.closeBtn} aria-label="Close" onClick={() => alert('Canceled')}>
            <CloseIcon />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.topStack}>
            <MoneyTypeToggle value={moneyType} onChange={setMoneyType} />
            <div className={styles.divider} />

            <div className={styles.infoRow}>
              <div className={styles.infoLeft}>
                <GameTypeIcon />
                <span className={styles.infoLabel}>Game type:</span>
              </div>
              <div className={styles.infoValue}>NL Hold’em 2/4</div>
            </div>

            <div className={styles.infoRow}>
              <div className={styles.infoLeft}>
                <AvailableBalanceIcon />
                <span className={styles.infoLabel}>Available balance:</span>
              </div>
              <div className={styles.infoValue} />
            </div>

            <BalancesBox moneyType={moneyType} realBalance={80} cashBalance={150} />
          </div>

          <div className={styles.chargeLine}>
            <div className={styles.infoLeft}>
              <CardIcon />
              <span className={styles.infoLabel}>You will be charged:</span>
            </div>
            <div className={styles.chargeValue}>{chargeText}</div>
          </div>

          <div className={styles.bottomStack}>
            <AmountControl value={amount} onChange={setAmount} min={AMOUNT_MIN} max={AMOUNT_MAX} step={0.5} />

            <button
              type="button"
              className={`${styles.btn} ${styles.btnSecondary} ${styles.btnAutoBuyIn}`}
              style={{ width: 336 }}
            >
              Auto Buy-In and Auto Rebuy
            </button>

            <TablesControl value={tables} onChange={setTables} min={1} />
          </div>
        </div>

        <div className={styles.footer}>
          <div className={styles.footerBtns}>
            <button type="button" className={`${styles.btn} ${styles.btnSecondary}`} onClick={() => alert('Canceled')}>
              Cancel
            </button>
            <button
              type="button"
              className={`${styles.btn} ${styles.btnPrimary}`}
              onClick={() =>
                alert(`Amount: ${amount}\nMoney type: ${moneyType}\nNumber of tables: ${tables}`)
              }
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

