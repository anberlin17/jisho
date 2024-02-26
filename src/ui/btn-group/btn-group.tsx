import clsx from 'clsx'
import './styles.scss'

export interface IButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  column?: boolean
}

export default function ButtonGroup({ className, column, children, ...restProps }: IButtonGroupProps) {
  return (
    <div className={clsx(className, 'btn-group', { 'btn-group_column': column })} {...restProps}>
      {children}
    </div>
  )
}
