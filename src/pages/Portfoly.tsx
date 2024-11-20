import { useEffect, useState } from 'react';
import KeyboardManager from '../components/KeyboardManager';
import About from '../components/sections/About';
import Education from '../components/sections/Education';
import Experience from '../components/sections/Experience';
import Hero from '../components/sections/Hero';
import Projects from '../components/sections/Projects';
import Skills from '../components/sections/Skills';
import { ICv } from '../interfaces/Cv';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Result, Spin } from 'antd';
import { getPortfoly } from '../services/portfoly';

export const Portfoly = () => {
  const { userId } = useParams<{ userId: string }>();
  const [cv, setCv] = useState<ICv | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCv = async () => {
      if (!isNaN(Number(userId))) {
        try {
          setLoading(true);
          setError(null);
          const { data } = await getPortfoly(Number(userId));
          setCv(data);
        } catch (error) {
          setError('Error al cargar el CV.');
        } finally {
          setLoading(false);
        }
      }
    };

    if (userId) {
      fetchCv();
    }
  }, [userId]);

  const toHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Result
          status="error"
          title="Error al cargar el CV"
          subTitle="Ocurrió un problema al obtener los datos. Intenta nuevamente más tarde."
          extra={[
            <Button type="primary" key="retry" onClick={() => toHome()}>
              Ir a la página principal
            </Button>
          ]}
        />
      </div>
    );
  }

  if (!cv) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Result
          status="404"
          title="CV no encontrado"
          subTitle="El usuario no tiene un CV registrado o la url es incorrecta."
          extra={[
            <Button type="primary" key="back" href="/">
              Volver al inicio
            </Button>
          ]}
        />
      </div>
    );
  }

  return (
    <main className="mx-auto w-full max-[700px]:p-8">
      <Hero basics={cv.basics} />
      <About summary={cv.basics.summary} />
      <Experience work={cv.work} />
      <Education education={cv.education} />
      <Projects projects={cv.projects} />
      <Skills skills={cv.skills} />
      <KeyboardManager profiles={cv.basics.profiles} />
    </main>
  );
};
