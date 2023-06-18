import { ConnectButton as CB } from "@rainbow-me/rainbowkit";
import Button from "@/components/elements/Button";
import { WalletIcon } from "@heroicons/react/24/outline";
export const ConnectButton = () => {
  // TODO - add avatar and name when connected
  // const {
  //   data: ensName,
  //   isError,
  //   isLoading,
  // } = useEnsName({
  //   address,
  // });

  // const {
  //   data: ensAvatar,
  //   isError: isAvatarError,
  //   isLoading: isAvatarLoading,
  // } = useEnsAvatar({
  //   name: ensName,
  // });

  // useEffect(() => {
  //   if (!address) return;
  //   sig?.signMessage();
  // }, [address]);

  return (
    <CB.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        mounted,
      }) => {
        const connected = mounted && account && chain;
        return (
          <div
            {...(!mounted
              ? {
                  "aria-hidden": true,
                  className:
                    "w-auto user-select-none pointer-events-none opacity-0",
                }
              : { className: "w-auto" })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    type="button"
                    variant="secondary"
                    handleClick={openConnectModal}
                  >
                    Connect Wallet
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button
                    type="button"
                    variant="secondary"
                    handleClick={openChainModal}
                  >
                    Wrong network
                  </Button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <Button
                    type="button"
                    variant="secondary"
                    handleClick={openAccountModal}
                  >
                    {account.ensAvatar ? (
                      <img
                        className="h-6 w-6 rounded-full mr-2"
                        src={account.ensAvatar}
                        alt="wallet icon"
                      />
                    ) : (
                      <WalletIcon className="h-5 w-5 rounded-full mr-2" />
                    )}

                    {account.displayName}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </CB.Custom>
  );
};
