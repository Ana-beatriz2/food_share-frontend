import Logo from "@/components/ui/logo";

const sections = [
  {
    title: "Como funciona?",
    description: "FoodShare é um portal para que Doadores Físicos(CPF) e Jurídicos(CNPJ) possam doar alimentos de pacotes fechados para pessoas de vulnerabilidade socioeconômica, evitando assim o desperdício de comida e dando-as para quem necessita."
  },
  {
    title: "Nosso Objetivo:",
    description: "Nosso Objetivo é ajudar a resolver os problemas de desperdício de alimentos e insegurança alimentar ao criar uma plataforma onde doadores podem disponibilizar alimentos que seriam descartados, mas estão em bom estado para consumo, conectando-os a pessoas e organizações que precisam desses itens."
  }
];

export default function Inicio() {
  return (
    <div className="flex relative flex-col items-center px-20 w-full text-xl font-bold text-lime-500 min-h-[1200px] rounded-[131px] max-md:px-5 max-md:max-w-full">
      <img
        loading="lazy"
        src="src\assets\background-inicio.png"
        className="object-cover absolute inset-0 w-full h-screen"
      />
      <div className="flex relative z-10 flex-col items-center -mt-6 w-full max-w-[1162px] max-md:max-w-full">
        <Logo />
        <div className="mt-11 text-3xl text-center text-primary max-md:mt-10 max-md:max-w-full">
          Portal de Doação de alimentos para famílias com vulnerabilidade Socioeconômica
        </div>
        <div className="mt-6 text-primary">Sem fins lucrativos</div>

        {sections.map((section, index) => (
          <div key={index} className="mt-8 text-center">
            <h2 className="text-2xl font-semibold text-primary">{section.title}</h2>
            <p className="mt-2 text-lg text-secondary">{section.description}</p>
          </div>
        ))}

        <div className="flex flex-col self-end mt-24 max-w-full text-right w-[937px] max-md:mt-10">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/2ccd772ec835f76d8f3b1992f3dd0e44f1e5148e9cf9cbb16f7d854a2955077d?placeholderIfAbsent=true&apiKey=dc407002bada4564be2dd09718dd06c0"
            alt="Food Share illustration"
            className="object-contain mt-60 max-w-full aspect-[1.74] w-[697px] max-md:mt-10"
          />
        </div>
      </div>
    </div>
  );
}
