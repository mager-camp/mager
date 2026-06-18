import PageHeader from "./components/PageHeader";
import ProfilPengguna from "./components/ProfilPengguna";
import ProtokolKeamanan from "./components/ProtokolKeamanan";
import { usePengaturan } from "./hooks/usePengaturan";
import UbahPasswordModal from "./components/UbahPasswordModal";

export default function PengaturanPage() {
  const {
    form: {
      register,
      handleSubmit,
      formState: { errors },
    },
    isEditing,
    fotoPreview,
    saved,
    fileInputRef,

    handleEdit,
    handleCancel,
    handleSave,
    handleFotoChange,

    openPasswordModal,
    setOpenPasswordModal,
    handleChangePassword,
    loading,
  } = usePengaturan();


  return (
    <>
      <form
        onSubmit={handleSubmit(handleSave)}
        className="
        flex flex-col gap-4
        p-10 md:p-12
        md:flex-1 md:min-h-0
        md:overflow-y-auto
      "
      >
        <PageHeader
          isEditing={isEditing}
          onEdit={handleEdit}
          onCancel={handleCancel}
        />

        <ProfilPengguna
          loading={loading}
          register={register}
          errors={errors}
          isEditing={isEditing}
          fotoPreview={fotoPreview}
          fileInputRef={fileInputRef}
          onFotoChange={handleFotoChange}
        />

        <ProtokolKeamanan
          loading={loading}
          isEditing={isEditing}
          onChangePassword={() => setOpenPasswordModal(true)}
        />
      </form>

      <UbahPasswordModal
        isOpen={openPasswordModal}
        onClose={() => setOpenPasswordModal(false)}
        onSubmit={handleChangePassword}
      />
    </>
  );
}
