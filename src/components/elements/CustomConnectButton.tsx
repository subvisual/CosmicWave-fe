import { ConnectButton as CB } from "@rainbow-me/rainbowkit";
import Button from "@/components/elements/Button";
export const ConnectButton = () => {
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
