import type { GetServerSideProps, InferGetServerSidePropsType, NextPage } from 'next';
import Head from 'next/head';
import Header from '../components/header/Header';
import APOD from '../components/sections/apod/APOD';
import NASAService from '../API/NASAService';
import { IImageAPOD, IVideoAPOD, mediaType } from '../types/APOD';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data: IImageAPOD | IVideoAPOD | null = await NASAService.getAPOD();  
  const options = { timeZone: 'America/New_York' };
  const now = new Date();
  const currentDateStr = now.toLocaleString('en-US', options);
  const currentDate = new Date(currentDateStr).toISOString();

  if (data) {
    let imageURL: string = "";
    if (data?.media_type === mediaType.IMAGE) imageURL = (data as IImageAPOD).hdurl;
    else if (data?.media_type === mediaType.VIDEO) imageURL = (data as IVideoAPOD).thumbnail_url;

    data.urlImg = imageURL;
  }

  return {
    props: {
      apod: data,
      currentDate: currentDate
    }
  }
}

const Home: NextPage = ({ apod, currentDate }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Space Blog App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <APOD
        data={apod}
        currentDate={currentDate}
      >
        <Header/>
      </APOD>
    </>
  )
}


export default Home;
