import { Icon } from "../components/common/Icon/Icon";
import { SelectField } from "../components/common/Select/SelectField";
import { TextInput } from "../components/common/TextInput/TextInput";
import { TextArea } from "../components/common/TextArea/TextArea";
import { Breadcrumbs } from "../components/common/Breadcrumbs";
import { useAddRecipe } from "./AddRecipePage.useAddRecipe";

export const AddRecipePage = () => {
  const {
    fileInputRef,
    isDragging,
    isSubmitting,
    isLoadingRefs,
    refsError,
    submitError,
    thumb,
    previewUrl,
    form,
    ingredientDraft,
    ingredients,

    categoryOptions,
    areaOptions,
    ingredientOptions,

    onFieldChange,
    onDraftChange,
    onThumbInput,
    onDrop,
    onDragEnter,
    onDragOver,
    onDragLeave,
    removeThumb,
    decTime,
    incTime,
    addIngredient,
    removeIngredientAt,
    clearAll,
    onSubmit,
  } = useAddRecipe();

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-10">
      {/* Breadcrumbs */}
      <div className="mb-10">
        <Breadcrumbs currentPage="Add recipe" />
      </div>

      {/* Header */}
      <div className="mb-10">
        <h1 className="font-extrabold text-[28px] md:text-[40px] leading-[32px] md:leading-[44px] tracking-[-0.02em] uppercase text-[#050505] mb-5">
          Add recipe
        </h1>
        <p className="font-medium text-sm md:text-base leading-6 tracking-[-0.02em] text-[#1a1a1a] max-w-[443px]">
          Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us.
        </p>
      </div>

      {refsError ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {refsError}
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="flex flex-col lg:flex-row gap-10 lg:gap-20">
        {/* LEFT: Upload */}
        <div className="w-full lg:w-[551px] flex-shrink-0">
          <div
            className={[
              "rounded-[30px] border border-dashed h-[300px] md:h-[400px] transition",
              isDragging ? "border-[#050505] bg-[#f5f5f5]" : "border-[#bfbebe] bg-white",
            ].join(" ")}
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onThumbInput}
            />

            <div className="flex h-full flex-col items-center justify-center">
              {!thumb ? (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex flex-col items-center gap-4 cursor-pointer hover:opacity-70 transition-opacity"
                >
                  <Icon name="upload-photo" size={64} className="text-[#050505]" />
                  <span className="font-medium text-base leading-6 tracking-[-0.02em] text-[#050505] underline underline-offset-4">
                    Upload a photo
                  </span>
                </button>
              ) : (
                <div className="w-full h-full p-4">
                  <div className="relative h-full overflow-hidden rounded-[20px]">
                    <img src={previewUrl} alt="Thumb preview" className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={removeThumb}
                      disabled={isSubmitting}
                      className="absolute top-3 right-3 flex items-center justify-center size-10 rounded-full bg-white/80 hover:bg-white transition-colors"
                      aria-label="Remove photo"
                    >
                      <Icon name="x" size={20} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Fields */}
        <div className="flex-1 flex flex-col gap-20">
          {/* Form Fields */}
          <div className="flex flex-col gap-10">
            {/* Recipe Name Section */}
            <div className="flex flex-col gap-10">
              {/* Title Input */}
              <div>
                <h2 className="font-extrabold text-xl md:text-2xl leading-7 tracking-[-0.02em] uppercase text-[#bfbebe] mb-10">
                  The name of the recipe
                </h2>
                <TextInput
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={onFieldChange}
                  placeholder="Enter a description of the dish"
                  maxLength={200}
                  disabled={isSubmitting}
                  variant="underline"
                  showCounter
                />
              </div>

              {/* Category + Cooking time */}
              <div className="flex flex-col md:flex-row gap-5">
                <div className="w-full md:w-[280px]">
                  <h3 className="font-extrabold text-lg md:text-xl leading-6 tracking-[-0.02em] uppercase text-[#050505] mb-4">
                    Category
                  </h3>
                  <SelectField
                    id="categoryId"
                    name="categoryId"
                    value={form.categoryId}
                    onChange={onFieldChange}
                    options={categoryOptions}
                    placeholder={isLoadingRefs ? "Loading..." : "Select a category"}
                    disabled={isLoadingRefs || isSubmitting}
                  />
                </div>

                <div>
                  <h3 className="font-extrabold text-lg md:text-xl leading-6 tracking-[-0.02em] uppercase text-[#050505] mb-4">
                    Cooking Time
                  </h3>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={decTime}
                      disabled={isSubmitting}
                      className="flex items-center justify-center size-14 rounded-[30px] border border-[#bfbebe] bg-white hover:bg-[#f5f5f5] transition-colors disabled:opacity-60 cursor-pointer"
                    >
                      <Icon name="minus" size={24} stroke="#050505" />
                    </button>

                    <span className="font-medium text-base leading-6 tracking-[-0.02em] text-[#bfbebe] min-w-[60px] text-center">
                      {form.cookingTimeMin} min
                    </span>

                    <button
                      type="button"
                      onClick={incTime}
                      disabled={isSubmitting}
                      className="flex items-center justify-center size-14 rounded-[30px] border border-[#bfbebe] bg-white hover:bg-[#f5f5f5] transition-colors disabled:opacity-60 cursor-pointer"
                    >
                      <Icon name="plus" size={24} stroke="#050505" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Area */}
              <div className="w-full md:w-[340px]">
                <h3 className="font-extrabold text-lg md:text-xl leading-6 tracking-[-0.02em] uppercase text-[#050505] mb-4">
                  Area
                </h3>
                <SelectField
                  id="areaId"
                  name="areaId"
                  value={form.areaId}
                  onChange={onFieldChange}
                  options={areaOptions}
                  placeholder={isLoadingRefs ? "Loading..." : "Area"}
                  disabled={isLoadingRefs || isSubmitting}
                />
              </div>

              {/* Ingredients */}
              <div>
                <h3 className="font-extrabold text-lg md:text-xl leading-6 tracking-[-0.02em] uppercase text-[#050505] mb-4">
                  Ingredients
                </h3>

                <div className="flex flex-col md:flex-row md:items-end gap-5">
                  <div className="w-full md:w-[280px]">
                    <SelectField
                      id="ingredientId"
                      name="ingredientId"
                      value={ingredientDraft.ingredientId}
                      onChange={onDraftChange}
                      options={ingredientOptions}
                      placeholder={isLoadingRefs ? "Loading..." : "Add the ingredient"}
                      disabled={isLoadingRefs || isSubmitting}
                    />
                  </div>

                  <div className="w-full md:w-[314px]">
                    <TextInput
                      id="measure"
                      name="measure"
                      value={ingredientDraft.measure}
                      onChange={onDraftChange}
                      placeholder="Enter quantity"
                      maxLength={60}
                      disabled={isSubmitting}
                      variant="underline"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Add Ingredient Button */}
            <button
              type="button"
              onClick={addIngredient}
              disabled={isLoadingRefs || isSubmitting}
              className="flex items-center justify-center gap-2 px-8 py-4 border border-[#050505] rounded-[30px] font-bold text-base leading-6 tracking-[-0.02em] uppercase text-[#050505] hover:bg-[#050505] hover:text-white transition-colors disabled:opacity-60 cursor-pointer w-fit"
            >
              Add ingredient
              <Icon name="plus" size={22} />
            </button>

            {/* Added Ingredients List */}
            {ingredients.length > 0 && (
              <div className="flex flex-wrap gap-4">
                {ingredients.map((ing, idx) => (
                  <div
                    key={`${ing.ingredientId}-${idx}`}
                    className="relative flex items-center gap-3 rounded-[30px] border border-[#bfbebe] bg-white px-4 py-3"
                  >
                    <button
                      type="button"
                      onClick={() => removeIngredientAt(idx)}
                      disabled={isSubmitting}
                      className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full border border-[#bfbebe] bg-white text-[#1a1a1a] hover:bg-[#f5f5f5] disabled:opacity-60 cursor-pointer"
                      aria-label="Remove ingredient"
                    >
                      <Icon name="x" size={14} />
                    </button>

                    <div className="flex size-14 items-center justify-center overflow-hidden rounded-[15px] bg-[#f5f5f5]">
                      {ing.img ? (
                        <img src={ing.img} alt={ing.label} className="h-full w-full object-cover" />
                      ) : (
                        <span className="text-xs text-[#bfbebe]">No img</span>
                      )}
                    </div>

                    <div className="min-w-[90px]">
                      <div className="font-medium text-sm text-[#050505]">{ing.label}</div>
                      <div className="text-xs text-[#bfbebe]">{ing.measure}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recipe Preparation */}
          <div>
            <h3 className="font-extrabold text-lg md:text-xl leading-6 tracking-[-0.02em] uppercase text-[#050505] mb-10">
              Recipe Preparation
            </h3>
            <TextArea
              id="instructions"
              name="instructions"
              value={form.instructions}
              onChange={onFieldChange}
              placeholder="Enter recipe"
              maxLength={1000}
              disabled={isSubmitting}
            />
          </div>

          {/* Submit error */}
          {submitError ? (
            <div className="rounded-[30px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          ) : null}

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={clearAll}
              disabled={isSubmitting}
              className="flex items-center justify-center size-14 rounded-[30px] border border-[#bfbebe] bg-white hover:bg-[#f5f5f5] transition-colors disabled:opacity-60 cursor-pointer"
              aria-label="Clear form"
              title="Clear"
            >
              <Icon name="trash" size={20} className="text-[#1a1a1a]" />
            </button>

            <button
              type="submit"
              disabled={isSubmitting || isLoadingRefs}
              className="flex items-center justify-center px-10 py-4 bg-[#1a1a1a] rounded-[30px] font-bold text-base leading-6 tracking-[-0.02em] uppercase text-white hover:bg-[#050505] transition-colors disabled:opacity-60 cursor-pointer"
            >
              {isSubmitting ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
