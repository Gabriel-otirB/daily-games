import { GameProps } from '@/utils/types/games';
import { redirect } from 'next/navigation';
import Image from 'next/image';
import Container from '@/components/Container';
import Label from './components/Label';
import GameCard from '@/components/GameCard';
import { Metadata } from 'next';

interface PropsParams {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: PropsParams): Promise<Metadata> {
  try {
    const response: GameProps = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`, { next: { revalidate: 60 } })
      .then((res) => res.json());

    return {
      title: response.title,
      description: `${response.description.slice(0, 100)}...`,
      openGraph: {
        title: response.title,
        images: [response.image_url]
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true,
        }
      }
    }

  } catch (error) {
    return {
      title: "DalyGames - Descubra jogos incríveis para se divertir."
    }
  }
}

async function getData(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`, { next: { revalidate: 60 } });
    return res.json();
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

async function getGameSorted() {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`);
    return res.json();
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

const Gaming = async ({ params: { id } }: { params: { id: string } }) => {

  const data: GameProps = await getData(id);
  const sortedGame: GameProps = await getGameSorted();

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

        <h2 className='font-bold text-lg mt-7 mb-2'>Plataforma</h2>
        <div className='flex gap-2 flex-wrap'>
          {data.platforms.map((item) => (
            <Label name={item} key={item} />
          ))}
        </div>

        <h2 className='font-bold text-lg mt-7 mb-2'>Categorias</h2>
        <div className='flex gap-2 flex-wrap'>
          {data.categories.map((item) => (
            <Label name={item} key={item} />
          ))}
        </div>

        <p className='mt-7 mb-2'><strong className='mr-1'>Data de lançamento:</strong>{data.release}</p>

        <h2 className='font-bold text-lg mt-7 mb-2'>Jogo recomendado:</h2>
        <div className='flex'>
          <div className='flex-grow'>
            <GameCard data={sortedGame} />
          </div>
        </div>
      </Container>

    </main>
  )
}

export default Gaming;