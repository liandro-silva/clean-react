import Styles from './styles.scss'

import React from 'react'

type Props = React.HTMLAttributes<HTMLElement> & {
  isNegative?: boolean
}

const Spinner: React.FC<Props> = ({ isNegative, ...props }: Props) => {
  const negativeClass = isNegative ? Styles.negative : ''
  return (
    <div
      {...props}
      data-testid="loading"
      className={[Styles.spinner, negativeClass, props.className].join(' ')}
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  )
}

export default Spinner
