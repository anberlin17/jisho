import { default as NextLink, LinkProps as NextLinkProps } from 'next/link'
import clsx from 'clsx'
import styles from './styles.module.css'

export interface ILinkProps extends NextLinkProps {
  className?: string
  href: string
  children: React.ReactNode
  type?: 'button' | 'link'
  ja?: string
  style?: React.CSSProperties
}

export default function Link({ className, type = 'link', ja, children, ...restProps }: ILinkProps) {
  return (
    <NextLink
      className={clsx(className, styles.link, type === 'button' && styles.linkButton)}
      {...restProps}
    >
      {type === 'button' ? (
        <>
          <span lang="en">{children}</span>
          {ja && <span lang="ja">{ja}</span>}
        </>
      ) : (
        children
      )}
    </NextLink>
  )
}
