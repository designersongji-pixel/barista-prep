/* =========================================================
   Barista English — 데이터
   - 영어 원문의 명백한 오타/문법은 교정함 (fixes 목록 참고)
   - 숫자는 숫자로 적어도/영어로 적어도 정답 처리됨
   ========================================================= */

/* ---------- 1. 면접 필수 영어 ---------- */
// q: 질문, a: 답변 후보(여러 개면 각각 연습), tip: 메모
const INTERVIEW = [
  { sec: "자기소개", items: [
    { q:{ko:"(자기소개 해주세요)", en:"Can you tell me a bit about yourself?"},
      a:[
        {ko:"저는 바리스타로 약 3년 정도 근무한 경험이 있습니다.", en:"I have about 3 years of experience working as a barista."},
        {ko:"한국에서 2년, 뉴질랜드에서 1년 동안 일했어요.", en:"2 years in Korea and the last year in New Zealand."},
        {ko:"이전 직장에서는 하루에 약 5~6kg 정도의 원두를 혼자 핸들링했습니다.", en:"In my previous job, I handled about 5 to 6 kilos of coffee beans a day by myself."},
        {ko:"그래서 바쁜 환경에 꽤 자신 있습니다.", en:"So I'm quite confident in a busy environment."},
        {ko:"저는 친화적인 성격이라 손님들의 이름이나 자주 드시는 메뉴를 기억하려고 항상 노력합니다.", en:"I'm a friendly person, so I always try to remember customers' names and what they usually drink."}
      ], tip:"뉴질랜드 = 오클랜드(북섬), 퀸스타운(남섬)" },
    { q:{ko:"카페 경력이 얼마나 되나요?", en:"How much café experience do you have?"},
      a:[
        {ko:"바리스타로 약 3년 일했습니다.", en:"I have about 3 years of experience working as a barista."},
        {ko:"한국에서 2년, 뉴질랜드에서 1년이요.", en:"2 years in Korea and the last year in New Zealand."}
      ]}
  ]},
  { sec: "비자·업무 시간", items: [
    { q:{ko:"비자는 뭐예요?", en:"What visa are you on?"},
      a:[{ko:"워킹홀리데이 비자입니다.", en:"I'm on a working holiday visa."}]},
    { q:{ko:"비자는 언제 만료되나요?", en:"When does it expire?"},
      a:[{ko:"제 비자는 내년 7월에 만료됩니다.", en:"My visa expires next July."}]},
    { q:{ko:"지금 일하고 있나요?", en:"Are you working at the moment?"},
      a:[{ko:"아니요, 지금은 일하고 있지 않아서 바로 시작할 수 있습니다.", en:"No, I'm not working at the moment, so I can start right away."}]},
    { q:{ko:"언제부터 일할 수 있나요?", en:"When can you start?"},
      a:[{ko:"바로 시작할 수 있습니다.", en:"I can start right away."}]},
    { q:{ko:"얼마나 오래 일할 수 있나요?", en:"How long can you work?"},
      a:[{ko:"최소 6개월은 가능하고, 1년 정도 거주할 계획입니다.", en:"I can work at least 6 months, because I'm planning to live here for about a year."}]},
    { q:{ko:"제가 알기로는 워홀 비자는 한 곳에서 6개월 이상 일 못하는 걸로 아는데, 맞나요?", en:"As far as I know, working holiday visa holders can't work at one place for more than 6 months. Is that correct?"},
      a:[{ko:"예전에는 그랬는데, 공식적으로 변경되었습니다. 보여드릴게요.", en:"It used to be like that, but it has officially changed. I'll show you something."}],
      tip:"Condition 8547 참고"},
    { q:{ko:"바리스타 잡만 찾고 있나요, 아니면 올라운더도 괜찮나요?", en:"Are you only looking for a barista role, or are you okay with doing all-rounder tasks as well?"},
      a:[{ko:"바리스타 잡을 중심으로 찾고 있지만, 올라운더도 좋습니다.", en:"I'm mainly looking for a barista role, but I'm also happy to work as an all-rounder."}]}
  ]},
  { sec: "TFN·연금", items: [
    { q:{ko:"TFN이나 연금은 있나요?", en:"Do you have a TFN and Super?"},
      a:[
        {ko:"네. TFN과 연금은 이미 신청했고, 지금 번호를 기다리고 있어요. 며칠 내로 나올 것 같아요.", en:"Yes. I already applied for TFN and Super. I'm just waiting for the numbers. Maybe they'll come in a few days."},
        {ko:"네. 둘 다 이미 가지고 있습니다. 번호까지요.", en:"Yes, I already have both, including the account numbers."}
      ]}
  ]},
  { sec: "거리·시간·기간", items: [
    { q:{ko:"어디에 살고 있나요?", en:"Where do you live?"},
      a:[{ko:"근처에 살고 있습니다.", en:"I live nearby."}]},
    { q:{ko:"근처에 사시나요?", en:"Do you live nearby?"},
      a:[{ko:"바로 근처예요.", en:"It's around the corner."}]},
    { q:{ko:"(평소에) 집에서 여기까지 얼마나 걸리나요?", en:"How long does it take from your place?"},
      a:[
        {ko:"15분 정도 걸립니다.", en:"It takes about 15 minutes."},
        {ko:"걸어서 20분 정도 걸립니다.", en:"It takes about 20 minutes on foot."},
        {ko:"버스로 10분 정도 걸립니다.", en:"It takes about 10 minutes by bus."},
        {ko:"트램으로 15분 정도 걸립니다.", en:"It takes about 15 minutes by tram."}
      ], tip:"현재형 takes = 평소에 걸리는 시간"},
    { q:{ko:"여기서 얼마나 떨어져 있나요?", en:"How far is your place from here?"},
      a:[
        {ko:"걸어서 10분 거리입니다.", en:"It's a 10 minute walk."},
        {ko:"버스로 15분 거리입니다.", en:"It's a 15 minute bus ride."},
        {ko:"여기서 걸어서 5분밖에 안 걸려요.", en:"It's just a 5 minute walk from here."},
        {ko:"트램으로 20분 거리에 살아요.", en:"I live about 20 minutes away by tram."},
        {ko:"꽤 가까워요, 10분밖에 안 걸려요.", en:"It's pretty close, only about 10 minutes away."}
      ], tip:"여러 문장 연습해보고 입에 붙는 표현을 쓰기"},
    { q:{ko:"(오늘) 여기까지 오는 데 얼마나 걸렸나요?", en:"How long did it take you to get here?"},
      a:[
        {ko:"15분 정도 걸렸습니다.", en:"It took me about 15 minutes."},
        {ko:"걸어서 20분 정도 걸렸습니다.", en:"It took about 20 minutes on foot."},
        {ko:"버스로 10분 정도 걸렸습니다.", en:"It took about 10 minutes by bus."},
        {ko:"트레인으로 1시간 정도 걸렸습니다.", en:"It took about an hour by train."}
      ], tip:"과거형 took = 오늘 걸린 시간"},
    { q:{ko:"여기서 지낸 지 얼마나 되었나요?", en:"How long have you been here?"},
      a:[
        {ko:"멜버른에 온 지 3주 정도 됐어요.", en:"I've been in Melbourne for about 3 weeks."},
        {ko:"여기 온 지 한 달 정도 됐어요.", en:"I've been here for about a month."},
        {ko:"멜버른에 도착한 지 2~3주 정도 됐어요.", en:"I arrived in Melbourne about a couple of weeks ago."}
      ]}
  ]},
  { sec: "경력 확인", items: [
    { q:{ko:"호주에서 일해본 적은 없죠?", en:"But you haven't worked in Australia, right?"},
      a:[
        {ko:"호주에서 일해본 적은 없지만, 말씀드렸듯이 뉴질랜드에서 1년 일한 경험이 있습니다.", en:"I haven't worked in Australia, but as I said, I have 1 year of experience in New Zealand."},
        {ko:"제가 알기로는 커피 문화가 꽤 비슷한 편입니다.", en:"As far as I know, the coffee cultures are quite similar."},
        {ko:"호주 카페의 기본 커피 메뉴들도 자신 있게 만들 수 있습니다.", en:"Also, I'm confident that I can make all standard Australian coffee menu items."}
      ]},
    { q:{ko:"한국에서만 일해봤나요?", en:"You've only worked in Korea?"},
      a:[
        {ko:"네. 한국에서만 일해봤지만, 호주 스타일 커피는 전부 만들 수 있습니다.", en:"Yes. I've only worked in Korea, but I can make all Australian-style coffee menu items."},
        {ko:"멜버른에서 일했던 헤드 바리스타에게 1:1 트레이닝도 받았습니다.", en:"I also had one-on-one training with a head barista who worked in Melbourne."}
      ], tip:"거짓말하기 싫다면 이 버전 (기회는 적을 수 있음)"},
    { q:{ko:"바쁜 카페에서 일해본 적 있나요?", en:"Have you worked in a busy café before?"},
      a:[
        {ko:"네, 있습니다.", en:"Yes, I have."},
        {ko:"테이크어웨이 위주의 바쁜 매장이었어요.", en:"It was a busy takeaway shop."},
        {ko:"혼자 하루에 5~6kg 정도의 원두를 사용했습니다.", en:"I handled about 5 to 6 kilos of coffee beans a day by myself."},
        {ko:"그래서 바쁜 환경에 꽤 자신 있습니다.", en:"So I'm quite confident in a busy environment."}
      ]},
    { q:{ko:"여기 엄청 바쁜데 괜찮나요?", en:"This place gets really busy. Are you okay with that?"},
      a:[{ko:"네, 당연하죠. 전혀 문제없어요.", en:"Yes, absolutely. No problem at all."}],
      tip:"Absolutely / Definitely / No problem at all"},
    { q:{ko:"접시 3개 한 번에 들 수 있나요?", en:"Can you carry 3 plates at once?"},
      a:[{ko:"네, 한 번에 3접시 들 수 있습니다.", en:"Yes, I can carry 3 plates at once."}]},
    { q:{ko:"이전 카페에서는 어떤 원두를 사용했나요?", en:"What beans did your previous café use?"},
      a:[
        {ko:"블렌드뿐만 아니라 싱글오리진도 다뤘고, 커피 브랜드는 올프레스였어요.", en:"We handled blend coffee and single origin as well, and the coffee brand was Allpress."},
        {ko:"블렌드 커피만 다뤘어요.", en:"We just handled blend coffee."}
      ]},
    { q:{ko:"EK43이나 싱글오리진 다뤄본 적 있나요?", en:"Any experience with an EK43 or single origin?"},
      a:[{ko:"네. 이전 직장에도 EK43이 있어서 다룰 줄 압니다.", en:"Yep. In my previous job, we had an EK43, so I'm familiar with that."}]},
    { q:{ko:"이전에 어떤 머신을 사용했나요?", en:"What machine were you using before?"},
      a:[{ko:"라마르조꼬 클래식이었고, 그라인더는 메저 로버였습니다.", en:"It was a La Marzocco Classic, and the grinder was a Mazzer Robur."}]},
    { q:{ko:"우리 머신은 4구에 압력도 4가지인데 사용할 줄 아나요?", en:"Our machine has 4 groups with 4 different pressure profiles. Are you comfortable using that?"},
      a:[{ko:"네. 멀티 그룹 머신에 익숙하고, 다른 압력 세팅을 배우는 데도 자신 있습니다.", en:"Yes, I'm familiar with multi-group machines, and I'm confident learning different pressure settings as well."}]},
    { q:{ko:"오픈이나 마감 해본 적 있나요?", en:"Have you ever opened or closed a café?"},
      a:[{ko:"네, 해본 적 있어서 익숙합니다.", en:"Yes, I have, so I'm familiar with it."}]}
  ]},
  { sec: "샷·그라인더·스티밍", items: [
    { q:{ko:"샷이 너무 빨리 나오면 어떻게 하나요?", en:"If the shot comes out too fast, what do you do?"},
      a:[{ko:"분쇄도를 더 곱게 조정합니다.", en:"I'll make it finer."}], tip:"finer /ˈfaɪ.nər/ 파이너r"},
    { q:{ko:"샷이 너무 느리게 나오면 어떻게 하나요?", en:"If the shot comes out too slow, what do you do?"},
      a:[{ko:"분쇄도를 더 굵게 조정합니다.", en:"I'll make it coarser."}], tip:"coarser /ˈkɔːr.sər/ 코얼서r"},
    { q:{ko:"하루에 그라인더는 몇 번 조정했나요?", en:"How many times did you adjust the grinder in a day?"},
      a:[
        {ko:"매일 아침 오픈할 때 한 번 조정했어요.", en:"I adjusted the grinder once every morning when opening."},
        {ko:"하지만 샷이 잘못 나올 때 다시 조정했습니다.", en:"But I adjusted it again when the shot wasn't coming out right."},
        {ko:"샷이 너무 빠르거나 느릴 때마다 다시 조정했습니다.", en:"But I adjusted it again whenever the shots were running too fast or too slow."}
      ]},
    { q:{ko:"더블 에스프레소의 적합한 추출 시간은 어느 정도라고 생각하나요?", en:"What do you think is a good extraction time for a double espresso?"},
      a:[{ko:"전 직장에서는 항상 22g을 쟀고, 보통 27~30초 정도를 목표로 했습니다.", en:"At my last job, we always weighed out 22g and usually aimed for about 27 to 30 seconds for a double espresso."}]},
    { q:{ko:"18g, 22g을 같은 양으로 추출하면 맛 차이가 어떤가요?", en:"If you use 18g and 22g of coffee but the yield is the same, what difference would you expect in taste?"},
      a:[{ko:"22g은 더 진하고 묵직하고, 18g은 더 가볍거나 덜 강하게 느껴질 수 있습니다.", en:"22g will taste stronger and heavier, and 18g might taste lighter or less intense."}]},
    { q:{ko:"추출 시간이 갑자기 짧아지거나 길어지면 뭐가 문제일까요?", en:"If espresso extraction time suddenly becomes shorter or longer, what could be the problem?"},
      a:[
        {ko:"먼저 도징량과 분쇄도를 확인합니다. 그래도 안 고쳐지면 탬핑을 확인합니다.", en:"First I check the dose and the grind size. But if the issue still isn't fixed, then I check the tamping."},
        {ko:"먼저 평소와 같은 양의 커피를 쓰고 있는지 도징량을 확인합니다.", en:"First, I would check the dose to make sure I'm using the same amount of coffee as usual."},
        {ko:"그다음 분쇄도를 확인합니다. 너무 굵으면 빨리, 너무 가늘면 느리게 나오기 때문입니다.", en:"Then I would check the grind size, because if the grind is too coarse, the shot will run faster, and if it's too fine, it will run slower."},
        {ko:"도징량과 분쇄도가 맞다면, 커피층이 고르고 채널링이 없는지 분배와 탬핑을 확인합니다.", en:"If the dose and grind size are correct, I would check my distribution and tamping to make sure the coffee bed is even and there is no channeling."}
      ], tip:"첫 번째가 짧은 버전, 2~4번째가 긴 버전"},
    { q:{ko:"싱글오리진과 블렌드의 차이를 설명해줄 수 있나요?", en:"Can you explain the difference between single origin and blend?"},
      a:[{ko:"싱글오리진은 한 지역에서 온 원두이고, 블렌드는 서로 다른 원두들을 섞은 것입니다.", en:"Single origin is from one place. Blend is a mix of different coffees."}]},
    { q:{ko:"마셔보지 않고 눈으로만 보고 샷이 잘못된 걸 어떻게 알 수 있죠?", en:"How can you tell if an espresso shot is bad without tasting it?"},
      a:[{ko:"샷의 흐름을 확인해야 한다고 생각합니다. 고르지 않거나 부드럽지 않게 나오면 뭔가 문제가 있는 거예요.", en:"I think I need to check the shot flow. If the espresso flows unevenly or not smoothly, I know something is wrong."}],
      tip:"꿀렁꿀렁 나오거나, 거품이 막 나오거나, 색이 고르지 않으면 플로우만 보고도 알 수 있음"},
    { q:{ko:"날씨(습도)에 따라 분쇄도를 어떻게 조절하나요?", en:"How do you adjust your grind size depending on the weather?"},
      a:[{ko:"습하면 조금 더 굵게, 건조하면 더 곱게 조절합니다.", en:"If it's humid, I grind a bit coarser. If it's dry, I grind finer."}],
      tip:"건조한 날엔 원두가 수축해 저항이 약해져 물이 빨리 빠짐 → 더 곱게(finer) 해서 속도를 늦춤"},
    { q:{ko:"바리스타로서 어떤 에스프레소가 좋은 에스프레소라고 생각하나요?", en:"As a barista, what do you think a good espresso is?"},
      a:[
        {ko:"원두에 적힌 컵 노트의 맛이 실제로 잘 느껴지는 것이라고 생각해요.", en:"I think a good espresso is when the flavours match the cup notes written on the beans."},
        {ko:"로스터가 의도한 맛이 살아나야 해요.", en:"It should bring out the flavours the roaster intended."},
        {ko:"에스프레소의 질감도 정말 중요하다고 생각해요.", en:"I think the mouthfeel is really important."},
        {ko:"좋은 에스프레소는 거칠거나 지나치게 쓰지 않고 부드럽고 깔끔해요.", en:"A good espresso feels smooth and clean, not harsh or overly bitter."}
      ]},
    { q:{ko:"이상적인 우유 스티밍 온도는 어느 정도라고 생각하나요?", en:"What is the ideal temperature for steamed milk?"},
      a:[{ko:"65도 정도로 만들려고 합니다.", en:"I try to steam the milk to around 65 degrees."}], tip:"엑스트라 핫 = 75도"},
    { q:{ko:"라떼아트는 어디까지 할 수 있나요?", en:"How far can you go with your latte art?"},
      a:[{ko:"하트, 튤립 같은 기본은 할 수 있고, 로제타와 스완도 가능합니다.", en:"I can do basic latte art like hearts and tulips, and I can also do rosettas and swans."}],
      tip:"같은 뜻: What kind of latte art can you do?"}
  ]},
  { sec: "레시피", items: [
    { q:{ko:"매직이 뭔지 설명할 수 있나요?", en:"Can you explain what a Magic is?"},
      a:[{ko:"더블 리스트레토에 플랫한 폼으로 3/4 정도 채운 커피입니다.", en:"Basically a double ristretto with flat foam, poured until about three-quarters full."}]},
    { q:{ko:"프라나 차이가 뭔가요?", en:"What is Prana Chai?"},
      a:[
        {ko:"프라나 차이는 파우더가 아닌 찻잎을 사용합니다.", en:"Prana Chai uses tea leaves, not powder."},
        {ko:"전 직장에서는 차와 우유를 함께 스팀하고, 위에 시나몬 파우더를 뿌렸어요.", en:"In my previous job, we steamed the milk together with the tea, and sprinkled cinnamon powder on top."}
      ]},
    { q:{ko:"플랫화이트와 카푸치노의 차이는?", en:"What's the difference between a flat white and a cappuccino?"},
      a:[{ko:"모두 폼의 차이예요. 플랫화이트는 얇은 폼, 카푸치노는 두꺼운 폼에 초코 파우더를 올립니다.", en:"It's all about the foam. A flat white has thinner foam, and a cappuccino has thicker foam with chocolate powder on top."}]},
    { q:{ko:"리스트레토와 에스프레소의 차이는?", en:"What's the difference between ristretto and espresso?"},
      a:[{ko:"리스트레토는 에스프레소의 짧은 버전이에요. 더 달고 진합니다.", en:"Ristretto is a shorter version of espresso. It tastes sweeter and stronger."}]},
    { q:{ko:"배치브루와 콜드브루의 차이를 알고 있나요?", en:"Do you know the difference between batch brew and cold brew?"},
      a:[
        {ko:"배치브루는 드립 커피 메이커 같은 배치브루 머신으로 뜨거운 물로 추출합니다.", en:"Batch brew is brewed with hot water using a batch brew coffee machine, like a drip coffee maker."},
        {ko:"콜드브루는 차가운 물로 추출하고, 보통 12~24시간 정도 걸립니다.", en:"Cold brew is made with cold water, and it usually takes many hours, like 12 to 24 hours."}
      ]}
  ]},
  { sec: "손님 응대", items: [
    { q:{ko:"무례한 손님은 어떻게 대응할 건가요?", en:"What would you do if a customer is rude?"},
      a:[{ko:"침착하고 정중하게 응대하고, 상황이 계속되면 매니저를 부를 거예요.", en:"I would stay calm and be polite. If the situation continues, I would call the manager."}],
      tip:"스타벅스에서 많이 물어봄"},
    { q:{ko:"손님이 커피가 너무 뜨겁다/차갑다고 하면 어떻게 하나요?", en:"What would you do if a customer says the coffee is too hot or too cold?"},
      a:[{ko:"먼저 사과드리고 바로 다시 만들어드릴 거예요. 그 후 매니저에게 알리거나 데일리 리포트에 적을 거예요.", en:"I would apologise first and remake it right away. Then I would inform the manager or write it in the daily report."}]},
    { q:{ko:"다른 직원이 주문을 잘못 받은 걸 알게 되면 어떻게 하나요?", en:"If another staff member took the order wrong and you noticed it, what would you do?"},
      a:[{ko:"먼저 사과드리고 바로 다시 만들어드릴 거예요. 그 후 매니저에게 알리거나 데일리 리포트에 적을 거예요.", en:"I would apologise first and remake it right away. Then I would inform the manager or write it in the daily report."}],
      tip:"데일리 리포트: 그날 어떻게 돌아갔는지, 컴플레인을 아이패드에 매일 적는 곳도 있음"}
  ]},
  { sec: "기타", items: [
    { q:{ko:"본인의 장점과 단점이 무엇인가요?", en:"What are your strengths and weaknesses?"},
      a:[
        {ko:"우선 저는 친화적인 성격이라 손님들의 이름이나 평소 메뉴를 기억하려고 항상 노력합니다.", en:"First of all, I'm a friendly person, and I always try to remember customers' names and what they usually drink."},
        {ko:"단점은 처음에 새로운 것에 익숙해지는 데 시간이 조금 필요할 수 있다는 점이에요.", en:"About my weakness, I might need some time to get used to new things at the beginning."},
        {ko:"하지만 한 번 익숙해지면 잘 해냅니다.", en:"But once I get used to it, I can handle it well."}
      ]},
    { q:{ko:"스트레스 관리는 어떻게 하나요?", en:"How do you manage your stress?"},
      a:[
        {ko:"보통 운동하거나 산책하면서 풀어요. 생각을 정리하는 데 좋아요.", en:"I usually manage stress by exercising or going for a walk. It helps me clear my mind."},
        {ko:"보통 러닝을 해요. 5~10킬로미터 정도요.", en:"I usually go for a run, like 5 to 10 kilometres."}
      ]},
    { q:{ko:"여가 시간에는 주로 무엇을 하나요?", en:"What do you usually do in your free time?"},
      a:[{ko:"주로 책을 읽고, 가끔 공원에 가요.", en:"I usually read books, and sometimes go to the park."}]},
    { q:{ko:"왜 이 카페에서 일하고 싶나요? 와본 적 있어요?", en:"Why do you want to work here? Have you been to our café before?"},
      a:[
        {ko:"사실 와본 적은 없는데, 지나갈 때마다 일하기 좋은 곳이라고 생각했어요.", en:"I actually haven't been here before, but whenever I walked past this café, I always thought it would be a nice place to work."},
        {ko:"그게 제가 지원한 이유 중 하나예요.", en:"That's one of the reasons why I applied."}
      ]},
    { q:{ko:"목표가 무엇인가요?", en:"What's your goal?"},
      a:[{ko:"(내 답을 직접 만들어보기) 제 목표는 ~입니다.", en:"My goal is to become a head barista."}],
      tip:"예시 답. My goal is ( ) / I'd like to ( ) / I want to improve ( ) 로 내 답 만들기"}
  ]},
  { sec: "역질문 (내가 물어볼 것)", items: [
    { q:{ko:"(면접관) 궁금한 거 있어요?", en:"Do you have any questions for us?"},
      a:[
        {ko:"시급이 얼마인지 여쭤봐도 될까요?", en:"Can I ask about the hourly pay?"},
        {ko:"캐주얼 포지션을 찾고 있어서, 캐주얼 레벨 1이면 좋을 것 같아요.", en:"I'm looking for a casual position, so I'm happy to be paid at Casual Level 1."},
        {ko:"주말 패널티가 있나요?", en:"Is there any weekend penalty rate?"},
        {ko:"주에 몇 시간 일할 수 있을까요?", en:"How many hours can I work per week?"},
        {ko:"주 30시간 이상 희망합니다.", en:"I'm looking for around 30 hours or more per week."},
        {ko:"스태프 밀 제공되나요?", en:"Do you guys do staff meals?"},
        {ko:"TFN인가요, 캐시인가요?", en:"Is it TFN or cash?"}
      ], tip:"주말 패널티: 토 x1.25, 일 x1.5, 공휴일 x2 / 레벨1 시급은 자료 기준 $31.19 — 최신 금액은 Fair Work에서 확인 / 쉬는 시간(브레이크)은 그만큼 돈을 못 받음"}
  ]}
];

/* ---------- 2. 매장 영어 (표현) ---------- */
const PHRASES = [
  { sec:"첫날 많이 쓰게 될 말", items:[
    {en:"Is there anything I can help with?", ko:"제가 도울 일 있을까요?", tip:"그냥 입에 달고, 숨쉴 때마다 말해"},
    {en:"Where do you guys keep the lids?", ko:"뚜껑은 어디에 보관해두나요?"},
    {en:"Do you guys reuse leftover milk?", ko:"여기 남은 우유 재사용하나요?"},
    {en:"Where should I chuck this out?", ko:"이거 어디에 버리면 돼요?"},
    {en:"Should I top this up?", ko:"이거 채워둘까요?"},
    {en:"I'll tidy this up.", ko:"이거 제가 정리해둘게요."},
    {en:"Where do you guys keep the extra milk?", ko:"여분 우유는 어디에 보관하나요?"},
    {en:"Do you guys usually add an extra shot to long blacks?", ko:"여기 롱블랙은 보통 샷을 하나 더 추가하나요?"},
    {en:"Do you guys usually use tap water for iced long blacks?", ko:"아이스 롱블랙 만들 때 보통 탭 워터 쓰나요?"},
    {en:"How many scoops do you guys usually put in for a medium?", ko:"미디엄 사이즈에는 보통 몇 스푼 넣나요?"},
    {en:"Do you know where the broom is?", ko:"빗자루 어디 있는지 아세요?"},
    {en:"Do you know how to open this?", ko:"이거 어떻게 여는지 아세요?"},
    {en:"Just so you know, we're out of sugar in the back as well.", ko:"참고로 뒤쪽 창고에도 설탕이 다 떨어졌어요."},
    {en:"Just so you know, we're running low on ice cream.", ko:"참고로 아이스크림이 거의 다 떨어져가요."},
    {en:"We might need to order a bit extra for the weekend.", ko:"주말 대비해서 조금 더 주문해야 할 것 같아요."},
    {en:"Hi, this is Café Koo. How can I help you?", ko:"안녕하세요, [카페 이름]입니다. 무엇을 도와드릴까요?", tip:"전화 오면 받자마자 이렇게 말해"},
    {en:"Sorry, it's my first day today, so I'm not too sure. I'll just get someone else to help you.", ko:"죄송해요, 오늘 첫날이라 잘 몰라서요. 다른 분 불러드릴게요."},
    {en:"Hey Koo, could you please take this call?", ko:"Koo, 이 전화 좀 받아줄래요?"}
  ]},
  { sec:"상황별 한마디", items:[
    {en:"Sure, would you like it toasted?", ko:"네, 토스트 해드릴까요?", tip:"토스트·데우기가 필요할 때"},
    {en:"I'll be with you in a sec.", ko:"잠시만요, 금방 갈게요."},
    {en:"Sorry, your payment didn't go through.", ko:"죄송해요, 결제가 안 됐어요.", tip:"카드 결제 안 됐을 때 (이럴 때 많음)"},
    {en:"Mind tapping again?", ko:"다시 한 번 찍어주시겠어요?"},
    {en:"Would you like a receipt?", ko:"영수증 드릴까요?"},
    {en:"Thanks! Have a good one.", ko:"감사합니다! 좋은 하루 보내세요.", tip:"손님 나갈 때"},
    {en:"Thanks for waiting!", ko:"기다려주셔서 감사해요!", tip:"늦게 나왔을 때"},
    {en:"Flat white for Koo? Here you are.", ko:"Koo님 플랫화이트요? 여기 있습니다.", tip:"커피 건네주며"},
    {en:"Sorry, we're out of it today.", ko:"죄송해요, 오늘 그건 다 떨어졌어요.", tip:"품절 안내"},
    {en:"Sorry, we've just cleaned the machine, but we still have cold drinks if you'd like?", ko:"죄송해요, 방금 머신을 청소해서요. 차가운 음료는 아직 돼요.", tip:"손님이 'Are you guys still open?' 물을 때"}
  ]},
  { sec:"서비스 플로우 (브런치 카페)", items:[
    {en:"Hi guys, are you guys dining in or taking away?", ko:"안녕하세요, 드시고 가세요 아니면 포장이세요?", tip:"1. 손님이 쭈뼛거리면 먼저 다가가기"},
    {en:"How many of you?", ko:"몇 분이세요?", tip:"2. 다이닝 인 인원 확인"},
    {en:"This way, please.", ko:"이쪽으로 오세요.", tip:"3. 자리 안내 — 진짜 많이 씀"},
    {en:"You guys can sit anywhere you want.", ko:"원하시는 자리에 앉으셔도 돼요."},
    {en:"Would you like to start with any drinks first?", ko:"음료 먼저 주문하시겠어요?", tip:"5. 음료 선주문 — 진짜 많이 씀"},
    {en:"You want a cup or a mug?", ko:"컵으로 드릴까요, 머그로 드릴까요?", tip:"★ 사이즈 파악 필수. 머그는 매장에 따라 라지를 뜻하기도"},
    {en:"What size would you like? We have regular and large.", ko:"사이즈는 어떻게 드릴까요? 레귤러와 라지가 있어요."},
    {en:"Thanks. Won't be long.", ko:"감사합니다. 금방 나와요."},
    {en:"Are you ready to order?", ko:"주문하시겠어요?", tip:"6. 테이블 관리"},
    {en:"All good?", ko:"괜찮으세요?"},
    {en:"Mind if I take this?", ko:"이거 치워도 될까요?"},
    {en:"Do you need any help?", ko:"도와드릴까요?"},
    {en:"Thank you. My pleasure.", ko:"감사합니다. / 별말씀을요."},
    {en:"Sorry, just one sec.", ko:"죄송해요, 잠시만요."}
  ]},
  { sec:"음식 데우기·티백·아이스", items:[
    {en:"Would you like it toasted or as is?", ko:"토스트 해드릴까요, 그대로 드릴까요?", tip:"TOASTED: 크로크무슈, 치킨랩, 바나나브레드, 토스트"},
    {en:"Would you like it toasted? With butter or not?", ko:"토스트 해드릴까요? 버터는요?", tip:"바나나브레드는 버터 여부까지 묻는 매장 많음"},
    {en:"Would you like it warmed up or as is?", ko:"데워드릴까요, 그대로 드릴까요?", tip:"WARMED UP(오븐): 햄치즈토마토 크루아상, 머핀, 베이컨에그롤, 파이, 소시지롤"},
    {en:"Would you like me to leave the tea bag in the cup, or take it out for you?", ko:"티백은 컵에 둘까요, 빼드릴까요?", tip:"테이크어웨이 블랙티는 계속 넣어두면 써짐"},
    {en:"Just so you know, it comes with a scoop of ice cream. Are you okay with that?", ko:"참고로 아이스크림 한 스쿱이 같이 나와요. 괜찮으세요?", tip:"아이스커피를 락토스프리로 주문했을 때 미리 안내"}
  ]},
  { sec:"응대·결제", items:[
    {en:"Does it come with sauce?", ko:"소스가 같이 나오나요?", tip:"손님이 자주 묻는 말"},
    {en:"Does it come with chips?", ko:"칩이 같이 나오나요?"},
    {en:"Sorry, it doesn't come with that. You need to order it separately.", ko:"죄송해요, 같이 안 나와요. 따로 주문하셔야 해요."},
    {en:"Yes, it comes with it!", ko:"네, 같이 나와요!"},
    {en:"That'll be 12 dollars. Cash or card?", ko:"12달러입니다. 현금이세요, 카드세요?"},
    {en:"When you're ready, please tap here. Would you like a receipt?", ko:"준비되시면 여기 찍어주세요. 영수증 드릴까요?"},
    {en:"Do you need a bag?", ko:"봉투 필요하세요?"},
    {en:"Do you need a cup tray?", ko:"컵 트레이 필요하세요?"},
    {en:"Where were you sitting today?", ko:"오늘 어디 앉으셨어요?"},
    {en:"Which table were you sitting at?", ko:"어느 테이블에 앉으셨어요?"},
    {en:"Sorry, we're out of croissants today.", ko:"오늘 크루아상은 다 팔렸어요."},
    {en:"Do you want me to chuck this out?", ko:"이거 버려드릴까요?"},
    {en:"It's still hot. It needs to cool down.", ko:"아직 뜨거워요. 식혀야 해요."},
    {en:"Where does this go?", ko:"이거 어디로 나가는 거예요?"},
    {en:"It's coming now. I'm on it.", ko:"지금 나가고 있어요. 제가 하고 있어요."}
  ]},
  { sec:"바 안에서 직원끼리", items:[
    {en:"Just so you know, we are almost out of sugar.", ko:"참고로 설탕이 거의 다 떨어졌어요."},
    {en:"Which button do you guys usually use for espresso?", ko:"에스프레소는 보통 어떤 버튼 쓰세요?"},
    {en:"That's for table 21, large skinny flat white.", ko:"21번 테이블, 라지 스키니 플랫화이트입니다."},
    {en:"Is this a spare shot?", ko:"이거 남은 샷이에요?"},
    {en:"Should I put the Equal inside or on the side?", ko:"이퀄은 음료 안에 넣나요, 따로 빼나요?"},
    {en:"Is this the flat white cup?", ko:"이게 플랫화이트 컵인가요?"},
    {en:"Can you put the cups in docket order?", ko:"도켓 순서대로 컵 놔줄래요?", tip:"in order = 순서대로"},
    {en:"Let me help you with that.", ko:"도와줄게요."},
    {en:"Need a hand?", ko:"도와줄까요?"},
    {en:"Yes, please. Could you?", ko:"네, 부탁해도 될까요?"},
    {en:"No, all good. Thanks.", ko:"아니요, 괜찮아요. 고마워요."},
    {en:"Can you restock the milk for tomorrow?", ko:"내일 쓸 우유 다시 채워줄래요?"},
    {en:"Can you take out the bins?", ko:"쓰레기통 비워줄래요?"},
    {en:"Make sure to wipe the bench after service.", ko:"서비스 후 벤치 닦는 거 잊지 마세요."},
    {en:"Don't forget to switch off the grinder.", ko:"그라인더 끄는 거 잊지 마요."},
    {en:"Can you clean up the back section?", ko:"뒤쪽 정리해줄래요?"},
    {en:"Make sure the dishwasher is empty.", ko:"식기세척기 비워놔 주세요."},
    {en:"Did you set the timer?", ko:"타이머 설정했어?"},
    {en:"I already set the timer.", ko:"이미 타이머 설정했어."}
  ]}
];

/* ---------- 3. 대화 패턴 (롤플레이) ---------- */
// who: "B" = 바리스타(나), "C" = 손님
const DIALOGUES = [
  { title:"테이크어웨이 주문 받기", lines:[
    {who:"B", en:"Hi, how are you?", ko:"안녕하세요, 잘 지내세요?"},
    {who:"C", en:"I'm good, thanks. And yourself?", ko:"좋아요, 고마워요. 당신은요?"},
    {who:"B", en:"Good, thanks. What can I get for you?", ko:"좋아요. 뭐 드릴까요?"},
    {who:"C", en:"Can I get a cappuccino, please?", ko:"카푸치노 하나 주세요."},
    {who:"B", en:"Sure, having here or takeaway?", ko:"네, 드시고 가세요 아니면 포장이세요?"},
    {who:"C", en:"Takeaway, please.", ko:"포장이요."},
    {who:"B", en:"What size would you like?", ko:"사이즈는요?"},
    {who:"C", en:"Can I get a medium, please?", ko:"미디엄으로 주세요."},
    {who:"B", en:"Anything else?", ko:"더 필요하신 건요?"},
    {who:"C", en:"That's it, thanks.", ko:"그게 다예요."},
    {who:"B", en:"Can I get your name?", ko:"성함이 어떻게 되세요?"},
    {who:"C", en:"Koo.", ko:"Koo요."},
    {who:"B", en:"That'll be $4.50. Cash or card?", ko:"4달러 50센트입니다. 현금이세요, 카드세요?"},
    {who:"C", en:"Card, please.", ko:"카드요."},
    {who:"B", en:"When you're ready, tap here, please.", ko:"준비되시면 여기 찍어주세요."},
    {who:"B", en:"Thanks. Won't be long.", ko:"감사합니다. 금방 나와요."}
  ]},
  { title:"다이닝 손님 계산", lines:[
    {who:"B", en:"Hi! How was everything today?", ko:"안녕하세요! 오늘 식사 어떠셨어요?"},
    {who:"C", en:"Good, thanks!", ko:"좋았어요!"},
    {who:"B", en:"Awesome. Where were you sitting?", ko:"다행이에요. 어디 앉으셨어요?"},
    {who:"C", en:"We were sitting just over there by the entrance.", ko:"저기 입구 쪽에 앉았어요."},
    {who:"B", en:"Hmm, let me check.", ko:"음, 확인해볼게요."},
    {who:"B", en:"Did you guys have a flat white and a big brekkie?", ko:"플랫화이트랑 빅브렉키 드셨죠?"},
    {who:"C", en:"Yeah, that's us.", ko:"네, 저희 맞아요."},
    {who:"B", en:"Pay together or split?", ko:"같이 계산하세요, 따로 하세요?"},
    {who:"C", en:"Split, please.", ko:"따로요."},
    {who:"B", en:"Sure! What did you have?", ko:"네! 뭐 드셨어요?"},
    {who:"C", en:"I had the flat white and a banana bread.", ko:"저는 플랫화이트랑 바나나브레드요."},
    {who:"B", en:"That'll be $17.50, when you're ready.", ko:"준비되시면, 17달러 50센트입니다."},
    {who:"C", en:"Can I get a receipt?", ko:"영수증 받을 수 있을까요?"},
    {who:"B", en:"Yes, here you are.", ko:"네, 여기 있습니다."}
  ]}
];

/* ---------- 4. 첫날 마인드 & 체크리스트 ---------- */
const MINDSET = [
  "카페에서 일 잘하는 사람은 커피만 잘 만드는 사람이 아니라, 바쁘지 않을 때 가만히 서 있지 않고 지금 매장에 뭐가 필요한지 먼저 보는 사람.",
  "원두가 부족하면 채워놓고, 컵이 비어 있으면 채우고, 설탕·파우더·탭 워터가 부족하면 미리 채워두고, 출근하면 우유 재고와 날짜를 확인하면서 채워놓고, 바닥이 더러우면 누가 말하기 전에 쓸고 닦기.",
  "\"시키면 할게요\"가 아니라 \"제가 먼저 보고 움직이겠습니다\"라는 태도."
];
const CHECKLIST = [
  "원두 hopper가 비어 있지 않은지 확인하기",
  "그라인더 주변 커피 가루 털고 정리하기",
  "컵, 뚜껑, 빨대, 냅킨 부족한 것 채워놓기",
  "테이크아웃 백, 컵홀더, 캐리어 부족한 것 채워놓기",
  "설탕, 파우더, 시럽, 초코 파우더 등 재료 확인하기",
  "시럽 펌프, 파우더 스푼 주변 끈적한 곳 닦기",
  "섞는 스푼 물이 더러우면 교체하기",
  "탭 워터나 물통이 비어 있으면 채워놓기",
  "우유 재고 확인하고, 날짜 먼저 체크하기",
  "우유는 오래된 날짜가 앞에 오도록 정리하기",
  "세척된 다인인 컵 제자리에 채워놓기",
  "머신 주변, 그라인더 주변 닦기",
  "커피머신 배수통/배수 다라이가 찼는지 확인하기",
  "행주가 더러우면 빨고, 물기가 많으면 짜놓기",
  "테이블, 의자, 바닥 더러운 곳 없는지 확인하고 닦기",
  "테이블 위에 설탕, Equal, 냅킨 등이 비어 있으면 돌아다니면서 채워놓기"
];

/* ---------- 5. 이름 ---------- */
const NAMES = [
  ["Remone","리몬"],["Ellie","엘리"],["Liam","리암"],["Sheryl","셰릴"],
  ["Liz","리즈"],["Indy","인디"],["Simon","사이먼"],["Mairea","마이라"],
  ["Eli","일라이"],["Hamish","헤이미쉬"],["Zain","자인"],["Rochelle","러쉘"],
  ["Kiran","키런"],["Rennie","레니"],["Clint","클린트"],["Catherine","캐서린"],
  ["Ethan","이든"],["Farida","페리다"],["Alfie","알피"],["Sandra","샌드라"],
  ["Silvie","실비"],["Kirby","커비"],["Elie","일라이"],["Vanessa","바네사"],
  ["Lyn","린"],["Emma","엠마"],["Matthew","매튜"],["Silvia","실비아"],
  ["Izzy","이지"],["Mafalda","마팔다"],["Richard","리처드"],["Nate","네이트"],
  ["Maeve","메이브"],["Andy","앤디"],["Dylan","딜런"],["Sophie","소피"],
  ["Noah","노아"],["Fiona","피오나"],["Lochlan","로클렌"],["Diana","다이애나"],
  ["Charlie","찰리"],["Percy","퍼시"],["Stephen","스티븐"],["Leah","리아"],
  ["Charlotte","샬럿"],["Catherina","캐서리나"],["Patrick","패트릭"],["Zoe","조이"],
  ["Isla","아일라"],["Maddie","매디"],["Harlan","할런"],["Stan","스탠"],
  ["Evie","이비/에비"],["Chloe","클로이"],["Michelle","미쉘"],["Amelia","아멜리아"],
  ["Casey","케이시"],["Sienna","시에나"],["Michael","마이클"],["Harper","하퍼"],
  ["Usman","우스만"],["Archie","아치"],["Muhammad","무하마드"],["Pete","피트"]
];

/* ---------- 6. 컵 마킹 ---------- */
const CUP_MENU = [
  // code, name, kind(milk: 우유 커피 / black: 블랙 / tea / choc / iced / kid). alt = 같은 뜻으로 인정하는 표기
  {code:"FW", name:"Flat White", ko:"플랫화이트", kind:"milk"},
  {code:"C", name:"Cappuccino", ko:"카푸치노", kind:"milk", alt:["CAP"]},
  {code:"L", name:"Latte", ko:"라떼", kind:"milk"},
  {code:"LB", name:"Long Black", ko:"롱블랙", kind:"black"},
  {code:"M", name:"Mocha", ko:"모카", kind:"milk"},
  {code:"MAG", name:"Magic", ko:"매직", kind:"milk", alt:["★","☆","MAGIC"]},
  {code:"HC", name:"Hot Chocolate", ko:"핫초코", kind:"choc"},
  {code:"Ch", name:"Chai Latte", ko:"차이 라떼", kind:"choc", alt:["CHAI"]},
  {code:"Ma", name:"Matcha Latte", ko:"말차 라떼", kind:"choc", alt:["MAT","MT"]},
  {code:"SM", name:"Short Macchiato", ko:"숏 마끼아또", kind:"milk", alt:["MAC","S/MAC"]},
  {code:"LM", name:"Long Macchiato", ko:"롱 마끼아또", kind:"milk", alt:["L/MAC"]},
  {code:"P", name:"Piccolo", ko:"피콜로", kind:"milk", alt:["PIC"]},
  {code:"D", name:"Double Espresso", ko:"더블 에스프레소(도피오)", kind:"black"},
  {code:"E", name:"Espresso", ko:"에스프레소", kind:"black"},
  {code:"BB", name:"Batch Brew", ko:"배치브루", kind:"brew"},
  {code:"CB", name:"Cold Brew", ko:"콜드브루", kind:"brew"},
  {code:"IL", name:"Iced Latte", ko:"아이스 라떼", kind:"iced"},
  {code:"IC", name:"Iced Coffee", ko:"아이스 커피", kind:"iced"},
  {code:"IM", name:"Iced Matcha", ko:"아이스 말차", kind:"iced"},
  {code:"B", name:"Babycino", ko:"베이비치노", kind:"kid"},
  {code:"EBT", name:"English Breakfast", ko:"잉글리시 브렉퍼스트(블랙티)", kind:"tea", alt:["BT","TEA"]},
  {code:"EGT", name:"Earl Grey", ko:"얼그레이", kind:"tea"},
  {code:"PMT", name:"Peppermint", ko:"페퍼민트", kind:"tea"},
  {code:"LGG", name:"Lemongrass Ginger", ko:"레몬그라스 진저", kind:"tea"},
  {code:"GTS", name:"Sencha Green", ko:"센차 녹차", kind:"tea"}
];
const CUP_OPTIONS = [
  // group: milk(우유 종류 → 메뉴 뒤에 / 로), 나머지는 아랫줄. dk = 도켓(POS 영수증)에 찍히는 문구
  {code:"", name:"Full Cream Milk", ko:"일반 우유", group:"milk", note:"생략 (아무것도 안 씀)"},
  {code:"SK", name:"Skim Milk", ko:"스킴(저지방)", group:"milk", say:"skinny", dk:"Skim Milk"},
  {code:"A", name:"Almond Milk", ko:"아몬드", group:"milk", say:"almond", dk:"Almond Milk"},
  {code:"Y", name:"Soy Milk", ko:"소이(두유)", group:"milk", alt:["S","SOY"], say:"soy", dk:"Soy Milk", note:"교본 컵에선 S로 씀 (C/S = 카푸치노 소이)"},
  {code:"O", name:"Oat Milk", ko:"오트(귀리)", group:"milk", say:"oat", dk:"Oat Milk"},
  {code:"LF", name:"Lactose Free Milk", ko:"락토프리", group:"milk", alt:["ZY"], say:"lactose free", dk:"Lactose Free"},
  {code:"X1", name:"Extra shot", ko:"샷 추가", group:"shot", alt:["XS","+1"], say:"with an extra shot", dk:"Extra Shot", note:"2샷 추가는 X2, 4샷 추가는 X4"},
  {code:"ST", name:"Strong", ko:"진하게", group:"shot", say:"strong", pre:true, dk:"Strong"},
  {code:"WK", name:"Weak / Half strength", ko:"연하게(반)", group:"shot", say:"half strength", pre:true, dk:"Half Strength"},
  {code:"3/4WK", name:"3/4 strength", ko:"3/4 농도", group:"shot", say:"three-quarter strength", pre:true, dk:"3/4 Strength"},
  {code:"XH", name:"Extra hot", ko:"아주 뜨겁게", group:"temp", alt:["!","!!","!!!","XXH","XXXH"], say:"extra hot", dk:"Extra Hot", note:"!, !!(Lava), !!!(Volcano), XXXH = 완전 뜨겁게"},
  {code:"HOT", name:"Hot", ko:"뜨겁게", group:"temp", say:"hot", dk:"Hot"},
  {code:"WARM", name:"Warm", ko:"미지근하게", group:"temp", say:"warm", dk:"Warm"},
  {code:"1S", name:"Sugar (1)", ko:"설탕 1", group:"sweet", say:"with one sugar", dk:"1 Sugar", note:"2스푼 2S, 1.5스푼 1.5S"},
  {code:"2S", name:"Sugar (2)", ko:"설탕 2", group:"sweet", say:"with two sugars", dk:"2 Sugars"},
  {code:"+HON", name:"Honey", ko:"꿀", group:"sweet", alt:["HON","+H","HONEY"], say:"with honey", dk:"Honey"},
  {code:"=", name:"Equal", ko:"이퀄(감미료)", group:"sweet", alt:["1=","EQ"], say:"with an Equal", dk:"1 Equal"},
  {code:"CAR", name:"Caramel", ko:"카라멜 시럽", group:"syrup", say:"with caramel", dk:"Caramel Syrup"},
  {code:"V", name:"Vanilla", ko:"바닐라 시럽", group:"syrup", alt:["VAN"], say:"with vanilla", dk:"Vanilla Syrup"},
  {code:"DC", name:"Decaf", ko:"디카페인", group:"decaf", alt:["DE"], say:"decaf", pre:true, dk:"Decaf"},
  {code:"DOM", name:"Dash of (cold) Milk", ko:"(찬) 우유 조금", group:"dash", alt:["DOCM"], say:"with a dash of cold milk", dk:"Dash of Cold Milk"},
  {code:"3/4F", name:"3/4 full", ko:"3/4만 채우기", group:"fill", say:"three-quarter full", dk:"3/4 Full"},
  {code:"XFROTH", name:"Extra froth", ko:"거품 많이", group:"foam", say:"extra frothy", dk:"Extra Froth", note:"컵엔 X froth"},
  {code:"VFLAT", name:"Very flat", ko:"폼 매우 얇게", group:"foam", say:"very flat", dk:"Very Flat", note:"컵엔 very flat"},
  {code:"DIRTY", name:"Dirty (+ shot)", ko:"더티(샷 추가)", group:"dirty", say:"dirty", pre:true, dk:"Dirty", note:"Dirty Chai = Chai D / Ch dirty"}
];
// 교본 15·16쪽 정답 + 올려준 사진 컵
const CUP_EXAMPLES = [
  {mark:"C/A\n1.5S\nX1", read:"카푸치노 · 아몬드 · 설탕 1.5스푼 · 1샷 추가", sure:true},
  {mark:"L/O\n3/4F\n3S", read:"라떼 · 오트 · 3/4만 채우기 · 설탕 3스푼", sure:true},
  {mark:"C/S\n+H\nhot", read:"카푸치노 · 소이 · 꿀 추가 · 뜨겁게", sure:true},
  {mark:"FW/SK\nvery\nflat", read:"플랫화이트 · 저지방(스킴) · 폼 매우 얇게", sure:true},
  {mark:"Ch\n+H\ndirty", read:"차이 라떼 · 꿀 · 샷 추가(더티)", sure:true},
  {mark:"HC / LF\nst\nwarm", read:"핫초코 · 락토프리 · 진하게 · 따뜻하게", sure:true},
  {mark:"M\n3s\nvan", read:"모카 · 설탕 3스푼 · 바닐라 시럽", sure:true},
  {mark:"LB\n2S", read:"롱블랙 · 설탕 2스푼", sure:true},
  {mark:"BT\n2S\nDOCM", read:"블랙티 · 설탕 2스푼 · 찬 우유 조금", sure:true},
  {mark:"FW/S\n=\ncar", read:"플랫화이트 · 소이 · 이퀄 · 카라멜", sure:true},
  {mark:"L/A\n3S\nXXXH", read:"라떼 · 아몬드 · 설탕 3스푼 · 완전 뜨겁게", sure:true},
  {mark:"C/S\n4S\nX4\nX froth", read:"카푸치노 · 소이 · 설탕 4스푼 · 4샷 추가 · 거품 많이", sure:true},
  {mark:"C/A\n1.5S\nDC", read:"카푸치노 · 아몬드 · 설탕 1.5 · 디카페인", sure:true},
  {mark:"L\n3/4F\nX1", read:"라떼 · 3/4만 채우기 · 1샷 추가", sure:true},
  {mark:"FW/SK\n!!", read:"플랫화이트 · 스킴 · 아주 뜨겁게(!!)", sure:true},
  {mark:"M/3s\nCar", read:"모카 · 설탕 3 · 카라멜", sure:true},
  {mark:"LB\nDOCM", read:"롱블랙 · 찬 우유 조금", sure:true},
  {mark:"L/LF\n3S\nXXXH", read:"라떼 · 락토프리 · 설탕 3 · 완전 뜨겁게", sure:true},
  {mark:"C/S\nX2\nV", read:"카푸치노 · 소이 · 2샷 추가 · 바닐라", sure:true},
  {mark:"L/O\n=\nHot", read:"라떼 · 오트 · 이퀄 · 뜨겁게", sure:true},
  {mark:"Magic\nSK", read:"매직 · 스킴", sure:true},
  {mark:"IC\ncar", read:"아이스 커피 · 카라멜", sure:true},
  {mark:"C\nX6\n6S\nX Froth", read:"카푸치노 · 6샷 추가 · 설탕 6스푼 · 거품 많이", sure:true}
];
// 도켓 연습용
const DOCKET_NAMES = ["Will","Amanda","Liam","Sophie","Noah","Chloe","Lochlan","Isla","Hamish","Zoe","Archie","Maeve","Ethan","Harper","Kiran","Sienna"];
const DOCKET_FOOD = [["Banana Bread","Toasted"],["Avocado Smash","Sourdough"],["Big Brekkie",""],["Ham Cheese Croissant","Warmed"],["Chilli Scramble (gf-o)",""],["Almond Croissant",""],["Bacon & Egg Roll","BBQ Sauce"]];
const CUP_SIZES = [{k:"S", oz:"8oz", name:"Small", ko:"스몰 8oz"},{k:"M", oz:"12oz", name:"Medium", ko:"미디엄 12oz"},{k:"L", oz:"16oz", name:"Large", ko:"라지 16oz"}];

/* ---------- 7. 자료실 (기본 내장 자료) ---------- */
const pagesOf = (dir, prefix, n, pad) => Array.from({length:n},(_,i)=>`materials/${dir}/${prefix}-${String(i+1).padStart(pad,"0")}.jpg`);
const MATERIALS = [
  {group:"수업 준비", title:"바리스타쿠 수업 전 필독 안내", type:"image", src:"materials/before-class.jpg"},
  {group:"교본", title:"바리스타쿠 교본 (58쪽)", type:"pages", pages:pagesOf("gyobon","gyobon",58,2), note:"돈·약어·이름·주문 대화문 숙지 필수"},
  {group:"교본", title:"수강생 트라이얼 후기 (148쪽)", type:"pages", pages:pagesOf("reviews","review",148,3)},
  {group:"실전 암기 필수", title:"면접 필수 질문 (PDF 11쪽)", type:"pages", pdf:"materials/interview-english.pdf",
   pages:Array.from({length:11},(_,i)=>`materials/interview-p-${String(i+1).padStart(2,"0")}.jpg`), note:"전부 암기"},
  {group:"실전 암기 필수", title:"노베이스 필독 (경력 없는 사람들 잘 들어라)", type:"image", src:"materials/first-day.jpg"},
  {group:"실전 암기 필수", title:"대화문 (하루에 수십 번 쓰게 될 대화패턴)", type:"image", src:"materials/dialogue-patterns.jpg"},
  {group:"실전 암기 필수", title:"Take out cup 약어", type:"image", src:"materials/cup-marking.jpg"},
  {group:"실전 암기 필수", title:"손님 이름", type:"image", src:"materials/names.jpg"},
  {group:"실전 암기 필수", title:"배달 도켓", type:"image", src:"materials/delivery-docket.jpg"},
  {group:"실전 암기 필수", title:"금고(캐시 드로어) 사진", type:"image", src:"materials/cash-drawer.jpg"},
  {group:"연습 필수", title:"연습 1", type:"image", src:"materials/practice-1.jpg"},
  {group:"연습 필수", title:"연습 2", type:"image", src:"materials/practice-2.jpg"},
  {group:"연습 필수", title:"연습 3", type:"image", src:"materials/practice-3.jpg"},
  {group:"스팀·라떼아트", title:"스팀완드 높이의 중요성", type:"image", src:"materials/steam-wand-height.jpg"},
  {group:"스팀·라떼아트", title:"스팀 위치", type:"image", src:"materials/steam-position.jpg"},
  {group:"스팀·라떼아트", title:"라떼아트 낙차의 중요성", type:"image", src:"materials/latte-art-height.jpg"},
  {group:"스팀·라떼아트", title:"현장에서 진짜 쓰는 스플릿 분배법", type:"image", src:"materials/split-pour.jpg"},
  {group:"커피·디저트 메뉴", title:"카페 메뉴", type:"image", src:"materials/cafe-menu.jpg"},
  {group:"커피·디저트 메뉴", title:"디저트", type:"image", src:"materials/desserts.jpg"},
  {group:"커피·디저트 메뉴", title:"차이", type:"image", src:"materials/chai.jpg"},
  {group:"커피머신·팁", title:"커피머신", type:"image", src:"materials/coffee-machine.jpg"},
  {group:"커피머신·팁", title:"EK43", type:"image", src:"materials/ek43.jpg"},
  {group:"커피머신·팁", title:"쿠팁", type:"image", src:"materials/koo-tips.jpg"}
];
