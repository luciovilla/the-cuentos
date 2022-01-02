import DocsLayout from '../components/DocsLayout'
import Newsletter from '../components/Newsletter'

export default function AboutPage(props) {
  return (
    <DocsLayout
      {...props}
      title="About The Cuentos"
      url="https://thecuentos.com/about"
      description="The goal of this website is to gather advice for first-generation Latinos."
    >
      <h1 className="text-4xl font-bold my-4">About The Cuentos</h1>
      <p className="mb-4">
        Hola! I'm{' '}
        <a href="https://luciovilla.com" className="underline" rel="noreferrer">
          Lucio
        </a>{' '}
        and I built and run The Cuentos. The goal of this website is to gather advice for
        first-generation Latinos on topics like financial aid, negotiating salaries and life advice.
      </p>
      <h2 className="text-xl font-bold mt-8 mb-4">Contact</h2>
      This website is still a work in progress so contact me if you have any questions, feedback or
      if you'd like to help at{' '}
      <a className="underline" href="mailto:hola@thecuentos.com">
        hola[at]thecuentos.com
      </a>
      <div className="mx-auto mt-10">
        <Newsletter />
      </div>
    </DocsLayout>
  )
}
