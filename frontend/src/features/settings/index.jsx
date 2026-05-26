import PageHeader       from "./components/PageHeader";
import ProfilPengguna   from "./components/ProfilPengguna";
import ProtokolKeamanan from "./components/ProtokolKeamanan";
import { usePengaturan } from "./hooks/usePengaturan";

export default function PengaturanPage() {
  const {
    form: { register, handleSubmit, formState: { errors } },
    isEditing,
    fotoPreview,
    saved,
    fileInputRef,
    handleEdit,
    handleSave,
    handleFotoChange,
  } = usePengaturan();

  return (
<form
  onSubmit={handleSubmit(handleSave)}
  className="
    flex flex-col gap-4
    p-4 md:p-6

    md:flex-1 md:min-h-0
    md:overflow-y-auto
  "
>
        {/* Header + tombol aksi */}
        <PageHeader
          isEditing={isEditing}
          saved={saved}
          onEdit={handleEdit}
          onSave={handleSubmit(handleSave)}
        />

        {/* Profil Pengguna */}
        <ProfilPengguna
          register={register}
          errors={errors}
          isEditing={isEditing}
          fotoPreview={fotoPreview}
          fileInputRef={fileInputRef}
          onFotoChange={handleFotoChange}
        />

        {/* Protokol Keamanan */}
        <ProtokolKeamanan isEditing={isEditing} />
      </form>
  );
}