
const FirstTimeChecklist = () => {
  return (
    <div className="bg-[#EEFCFF] min-h-screen text-[#011638]">
      <section className="px-4 sm:px-8 py-12 md:py-16 max-w-5xl mx-auto">

        {/* Title */}
        <div className="flex items-center justify-center mb-4">
          <div className="h-px flex-1 max-w-16 sm:max-w-32 bg-[#011638]"></div>
          <h1 className="staatliches mx-4 text-center text-4xl md:text-5xl lg:text-6xl tracking-wide">
            FIRST VISIT CHECKLIST
          </h1>
          <div className="h-px flex-1 max-w-16 sm:max-w-32 bg-[#011638]"></div>
        </div>

        {/* Checklist Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

          {/* Step 1 */}
          <div className="bg-[#233EA1] text-white p-6 flex flex-col tracking-wide shadow-lg">
            <div className="flex items-start gap-4 mb-4">
              <div className="staatliches bg-white text-[#011638] rounded-full w-11 h-11 flex items-center justify-center text-2xl shrink-0">1</div>
              <h2 className="staatliches text-2xl md:text-3xl leading-tight">
                Fill Out Movement's Liability Waiver
              </h2>
            </div>
            <div className="flex flex-col gap-3 text-base md:text-lg leading-snug">
              <p>
                Go to&nbsp;
                <a
                  href="https://movementgyms.com/participant-agreement/?utm_source=google&utm_medium=cpc&utm_campaign=Pmax+National&utm_content=&utm_term=&gad_source=1&gad_campaignid=22629819105&gbraid=0AAAAAoU9BBuTJXst5uI2A608im69yNQcI&gclid=CjwKCAjwtfvEBhAmEiwA-DsKjmUsPQtDaKttsNJ_TZGiWTyHAxN2G_M5TRW-aK_ktQ9yqHZ3yV0khxoCpa4QAvD_BwE"
                  className="underline hover:text-[#D7263D] hover:cursor-pointer transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  this link
                </a>
                &nbsp;and sign Movement's participant agreement under the Chicago gyms form.
              </p>
              <p>
                When entering the gym, make sure to have a government ID for the front desk to check.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-[#233EA1] text-white p-6 flex flex-col tracking-wide shadow-lg">
            <div className="flex items-start gap-4 mb-4">
              <div className="staatliches bg-white text-[#011638] rounded-full w-11 h-11 flex items-center justify-center text-2xl shrink-0">2</div>
              <h2 className="staatliches text-2xl md:text-3xl leading-tight">
                Fill Out DePaul Club Sports Waiver
              </h2>
            </div>
            <div className="flex flex-col gap-3 text-base md:text-lg leading-snug">
              <p>
                Fill out&nbsp;
                <a
                  href="https://dehub.depaul.edu/cgtest/survey?survey_uid=f26a18c0-990e-11e9-a04e-0a85c368333a"
                  className="underline hover:text-[#D7263D] hover:cursor-pointer transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  this form
                </a>
                &nbsp;to signify to DePaul that you can participate in club sports.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-[#233EA1] text-white p-6 flex flex-col tracking-wide shadow-lg">
            <div className="flex items-start gap-4 mb-4">
              <div className="staatliches bg-white text-[#011638] rounded-full w-11 h-11 flex items-center justify-center text-2xl shrink-0">3</div>
              <h2 className="staatliches text-2xl md:text-3xl leading-tight">
                Buy a Day Pass and Pay Club Dues
              </h2>
            </div>
            <div className="flex flex-col gap-3 text-base md:text-lg leading-snug">
              <p>Both must be purchased before entering a meeting.</p>
              <p>
                If you have a Movement membership, you only need to pay dues each quarter.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-[#233EA1] text-white p-6 flex flex-col tracking-wide shadow-lg">
            <div className="flex items-start gap-4 mb-4">
              <div className="staatliches bg-white text-[#011638] rounded-full w-11 h-11 flex items-center justify-center text-2xl shrink-0">4</div>
              <h2 className="staatliches text-2xl md:text-3xl leading-tight">
                Double Check Which Gym We're Meeting At
              </h2>
            </div>
            <div className="flex flex-col gap-3 text-base md:text-lg leading-snug">
              <p>
                We rotate between Movement Lincoln Park and Movement Wrigleyville — check the
                calendar so you show up at the right one!
              </p>
            </div>
          </div>

        </div>

        {/* Closing note */}
        <p className="staatliches text-center text-[#D7263D] text-xl md:text-3xl tracking-widest mt-10 md:mt-14">
          SEE YOU ON THE WALL!
        </p>

      </section>
    </div>
  );
};

export default FirstTimeChecklist;
