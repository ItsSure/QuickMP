import { Button, Input, Modal } from "antd";
import GitHub from "../icons/GitHub";
import LinkedIn from "../icons/LinkedIn";
import X from "../icons/X";
import { Profile } from "../interfaces/Profile";
import { useEffect, useState } from "react";
import PrintIcon from "../icons/PrintIcon";
import { SocialIcon } from "../interfaces/SocialIcon";

const SOCIAL_ICONS: SocialIcon = {
  GitHub,
  LinkedIn,
  X,
};

export default function KeyboardManager({
  profiles,
}: Readonly<{ profiles: Profile[] | undefined }>) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = (hotkey: string) => {
    if (hotkey === "ctrl+P") window.print();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const actions = [
    {
      id: "print",
      title: "Imprimir",
      icon: <PrintIcon />,
      hotkey: "ctrl+P",
      handler: () => window.print(),
    },
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        showModal();
      }
      if (event.key === "Escape") {
        handleCancel();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const filtered = profiles?.filter(({ network }) =>
      network.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProfiles(filtered);
  }, [searchTerm, profiles]);

  if (!profiles) return null;

  return (
    <>
      <footer className="max-[768px]:hidden fixed bottom-0 left-0 w-full bg-gray-100 border-t border-gray-300 py-2 px-4 text-center text-sm no-print">
        <div className="md:flex items-center justify-center">
          Pulsa <kbd className="bg-gray-200 rounded px-1 text-xs">Ctrl</kbd> +{' '}
          <kbd className="bg-gray-200 rounded px-1 text-xs">K</kbd> para abrir
          la paleta de comandos.
        </div>
      </footer>
      <div className="md:hidden no-print">
        <Button
          onClick={showModal}
          className="fixed right-4 bottom-4 bg-white border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center shadow"
        >
          <span className="text-[30px]">+</span>
        </Button>
      </div>

      <Modal
        title="Comandos"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        className="fade-in"
      >
        <div className="mb-4">
          <Input
            placeholder="Buscar comando"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded"
          />
        </div>

        <h3 className="font-semibold">Acciones</h3>
        <ul className="mb-4">
          {actions.map(({ id, title, hotkey, icon }) => (
            <li key={id} className="py-1">
              <Button
                type="link"
                onClick={() => {
                  handleOk(hotkey);
                }}
                className="text-gray-500 hover:underline"
              >
                {icon}
                {title} <span className="text-gray-400">({hotkey})</span>
              </Button>
            </li>
          ))}
        </ul>

        <h3 className="font-semibold">Social</h3>
        <ul>
          {filteredProfiles?.map(({ network, url }) => {
            const firstLetter = network[0].toUpperCase();
            const IconComponent = SOCIAL_ICONS[network];
            return (
              <li key={network} className="py-1">
                <Button
                  type="link"
                  onClick={() => window.open(url, '_blank')}
                  className="text-gray-500 hover:underline"
                >
                  {IconComponent && <IconComponent />}
                  {network}{' '}
                  <span className="text-gray-400">
                    ({`ctrl+${firstLetter}`})
                  </span>
                </Button>
              </li>
            );
          }) || null}
        </ul>

        <footer className="mt-4 text-sm text-gray-500 text-center">
          Presiona <kbd className="bg-gray-200 rounded px-1 text-xs">Esc</kbd>{' '}
          para cerrar.
        </footer>
      </Modal>
    </>
  );
}
