import type { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: '/mart-retail-software',
    permanent: false,
  },
})

export default function POSPage() {
  return null
}
