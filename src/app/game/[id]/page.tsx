import { GameProps } from '@/utils/types/games';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Container from '@/components/Container';

async function getData(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`);
    return res.json();
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

const Gaming = async ({ params: { id } }: { params: { id: string } }) => {

  const data: GameProps = await getData(id);

  if (!data) redirect('/');

  return (
    <main className='w-full text-black'>
      <div className="bg-black h-80 sm:h96 w-full relative">
        <Image
          alt={data.title}
          src={data.image_url}
          priority={true}
          quality={100}
          fill={true}
          className='object-cover w-full h-80 sm:h-96 opacity-75'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 44vw'
        />
      </div>

      <Container>
        <h1 className='font-bold text-xl my-4'>{data.title}</h1>
        <p>{data.description}</p>
      </Container>

    </main>
  )
}

export default Gaming;