
const FirstTimeChecklist = () => {
  return (
    <div className="bg-[#EEFCFF] min-h-screen flex flex-col items-center py-12 staatliches text-white">
      {/* Title */}
      <h1 className="staatliches text-5xl text-[#011638] mb-12">
        First Visit Checklist
      </h1>

        <div className="flex flex-col gap-8">
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row md:justify-between gap-8">
            {/* Box 1 */}
            <div className="bg-[#233EA1] w-72 h-84 text-center tracking-wide">
                <ol className="list-decimal list-inside text-3xl p-2">
                    <li value="1">Fill out movement's liability waiver</li>
                </ol>
                <div className="flex flex-col p-2 text-left ml-2 gap-2">
                    <p className="text-lg">Go to&nbsp;
                      <a href="https://movementgyms.com/participant-agreement/?utm_source=google&utm_medium=cpc&utm_campaign=Pmax+National&utm_content=&utm_term=&gad_source=1&gad_campaignid=22629819105&gbraid=0AAAAAoU9BBuTJXst5uI2A608im69yNQcI&gclid=CjwKCAjwtfvEBhAmEiwA-DsKjmUsPQtDaKttsNJ_TZGiWTyHAxN2G_M5TRW-aK_ktQ9yqHZ3yV0khxoCpa4QAvD_BwE"
                      className="hover:cursor-pointer underline"
                      target="_blank" rel="noopener noreferrer">
                      this link</a>
                      &nbsp;and sign movement's participant agreement under the chicago gyms form
                    </p>
                    <p className="text-lg">Then when entering the gym please make sure to have
                      a government ID for the front desk to check
                    </p>
                </div>
            </div>
            {/* Box 2 */}
            <div className="bg-[#233EA1] w-72 h-84 text-center tracking-wide">
                <ol className="list-decimal list-inside text-3xl p-2">
                    <li value="2">Fill out depaul club sports waiver</li>
                </ol>
                <div className="flex flex-col p-2 text-left ml-2 gap-2">
                    <p className="text-lg">fill out&nbsp;
                      <a href="https://dehub.depaul.edu/cgtest/survey?survey_uid=f26a18c0-990e-11e9-a04e-0a85c368333a"
                      className="hover:cursor-pointer underline"
                      target="_blank" rel="noopener noreferrer">
                      this form</a>
                      &nbsp;to signify to depaul that you can participate in club sports
                    </p>
                </div>
            </div>

        </div>

        {/* Row 2 */}
        <div className="flex flex-col md:flex-row md:justify-center gap-8 mb-12 md:mb-16">
            {/* Box 3 */}
            <div className="bg-[#233EA1] w-72 h-84 text-center tracking-wide">
                <ol className="list-decimal list-inside text-3xl p-2">
                    <li value="3">Buy at least 1 Day Pass and Pay Club Dues</li>
                </ol>
                <div className="flex flex-col p-2 text-left ml-2 gap-2">
                    <p className="text-lg">Both must be purchased before entering a meeting</p>
                    <p className="text-md">If you have a Movement membership then you only need to pay dues each quarter</p>
                </div>
            </div>
            {/* Box 4 */}
            <div className="bg-[#233EA1] w-72 h-84 text-center tracking-wide">
                <ol className="list-decimal list-inside text-3xl p-2">
                    <li value="4">Double Check which gym we are meeting at</li>
                </ol>
                <div className="flex flex-col p-2 text-left ml-2 gap-2">
                    <p className="text-lg">
                      Please check that you are going to the right gym!
                    </p>
                </div>
            </div>            
        
        </div>
      </div>
   
    </div>
  );
};

export default FirstTimeChecklist;
