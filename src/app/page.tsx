import Container from '@/components/container';
import { GameProps } from '@/utils/types/games';
import Image from "next/image";
import Link from "next/link";

async function getDalyGame() {
  try {

    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`);
    return res.json();

  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

export default async function Home() {
  const dalyGame: GameProps = await getDalyGame();

  return (
    <main className='w-full'>
      <Container>
        <h1 className='text-center font-bold text-xl mt-8 mb-5'>Separamos um jogo exclusivo pra você</h1>
        <Link href={`/game/${dalyGame.id}`}>
        <section className="w-full bg-black rounded-lg">
          <Image
           alt={dalyGame.title}
           src={dalyGame.image_url}
           priority={true}
           quality={100}
           width={100}
           height={100}
           />
        </section>
        </Link>

      </Container>
    </main>
  );
}
