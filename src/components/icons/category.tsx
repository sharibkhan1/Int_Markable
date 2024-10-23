import clsx from 'clsx'
import React from 'react'

type Props = { selected: boolean }

function Category({ selected }: Props) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="3"
        width="8"
        height="8"
        rx="3"
        className={clsx(
          'dark:group-hover:fill-[#f8f0dc] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#FFC83A]',
          { 'dark:!fill-[#f8f0dc] fill-[#FFC83A] ': selected }
        )}
      />
      <rect
        x="3"
        y="13"
        width="8"
        height="8"
        rx="3"
        className={clsx(
          'dark:group-hover:fill-[#f8f0dc] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#FFC83A]',
          { 'dark:!fill-[#f8f0dc] fill-[#FFC83A] ': selected }
        )}
      />
      <rect
        x="13"
        y="3"
        width="8"
        height="8"
        rx="3"
        className={clsx(
          'dark:group-hover:fill-[#f8f0dc] transition-all dark:fill-[#353346] fill-[#BABABB] group-hover:fill-[#FFC83A]',
          { 'dark:!fill-[#f8f0dc] fill-[#FFC83A] ': selected }
        )}
      />
      <rect
        x="13"
        y="13"
        width="8"
        height="8"
        rx="3"
        className={clsx(
          'dark:group-hover:fill-[#FFC83A] transition-all dark:fill-[#C0BFC4] fill-[#5B5966] group-hover:fill-[#f3e4be] ',
          { 'dark:!fill-[#FFC83A] fill-[#f3e4be] ': selected }
        )}
      />
    </svg>
  )
}

export default Category