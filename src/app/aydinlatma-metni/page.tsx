import type { Metadata } from "next";
import Link from "next/link";
import { CONSENT_VERSION, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `Aydınlatma metni · ${site.name}`,
};

// DİKKAT: Bu metin yalnızca bekleme listesi başvuruları içindir ve bir
// başlangıç taslağıdır. Yayına almadan önce KVKK avukatına kontrol ettirin.
// Ürünün kendisi (seans verisi) için ayrı aydınlatma metni ve veri işleme
// sözleşmesi gerekecek.

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="mt-10 font-serif text-xl font-semibold text-ink">{children}</h2>;
}

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
      <Link href="/" className="text-sm font-medium text-accent hover:text-accent-hover">
        ← {site.name} ana sayfa
      </Link>
      <h1 className="mt-6 font-serif text-3xl font-semibold tracking-tight text-ink">
        Beta başvurusu aydınlatma metni
      </h1>
      <p className="mt-2 text-sm text-muted">Sürüm: {CONSENT_VERSION}</p>

      <div className="mt-6 space-y-4 leading-relaxed text-muted">
        <p>
          Bu metin, 6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında, {site.name}{" "}
          beta programına başvururken paylaştığınız kişisel verilerin nasıl işlendiğini açıklar.
          Bu formda sağlık verisi ya da danışan bilgisi toplanmaz.
        </p>

        <H2>Veri sorumlusu</H2>
        <p>
          {site.dataController}. İletişim:{" "}
          <a href={`mailto:${site.contactEmail}`} className="text-accent underline underline-offset-2">
            {site.contactEmail}
          </a>
        </p>

        <H2>İşlenen veriler</H2>
        <p>
          Ad soyad, e-posta adresi, meslek, çalışma şekli, haftalık seans sayısı, seans notlarına
          ayrılan süre (bu iki alan isteğe bağlıdır), onay tarihi ve başvurunun hangi bağlantıdan
          geldiği bilgisi.
        </p>

        <H2>İşleme amaçları</H2>
        <ul className="list-disc space-y-2 pl-5">
          <li>Beta programı açıldığında sizinle e-posta ile iletişime geçmek,</li>
          <li>Katılımcıları seçmek ve kısa tanışma görüşmeleri planlamak,</li>
          <li>Ürünü geliştirmek için meslek ve çalışma şekline dair toplu istatistik çıkarmak.</li>
        </ul>
        <p>Verileriniz tanıtım ya da reklam e-postası göndermek için kullanılmaz.</p>

        <H2>Hukuki sebep ve toplama yöntemi</H2>
        <p>
          Verileriniz, bu sayfadaki form aracılığıyla elektronik ortamda ve KVKK madde 5/1
          uyarınca açık rızanıza dayanarak toplanır.
        </p>

        <H2>Aktarım</H2>
        <p>
          Veriler, Avrupa Birliği bölgesinde barındırılan veritabanı hizmet sağlayıcımız (Supabase)
          ve sitenin barındırma hizmet sağlayıcısı (Vercel) aracılığıyla işlenir. Bu hizmet
          sağlayıcıların sunucuları yurt dışında bulunduğundan aktarım, KVKK madde 9 kapsamında
          açık rızanıza dayanarak yapılır. Verileriniz başka hiçbir üçüncü kişiyle paylaşılmaz ve
          satılmaz.
        </p>

        <H2>Saklama süresi</H2>
        <p>
          Verileriniz beta programı süresince ve programın sona ermesinden itibaren en fazla 6 ay
          saklanır. Onayınızı geri aldığınızda verileriniz en geç 30 gün içinde silinir.
        </p>

        <H2>Haklarınız</H2>
        <p>
          KVKK madde 11 uyarınca verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme,
          düzeltilmesini ya da silinmesini isteme, onayınızı geri alma ve kanunda sayılan diğer
          haklarınızı kullanmak için{" "}
          <a href={`mailto:${site.contactEmail}`} className="text-accent underline underline-offset-2">
            {site.contactEmail}
          </a>{" "}
          adresine yazabilirsiniz. Başvurunuz en geç 30 gün içinde yanıtlanır.
        </p>
      </div>
    </main>
  );
}
