import { Button } from "../components/common/Button/Button";
import { SelectField } from "../components/common/Select/SelectField";
import { TextInput } from "../components/common/TextInput/TextInput";
import { TextArea } from "../components/common/TextArea/TextArea";
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
    <div className="mx-auto w-full max-w-6xl px-4 py-10">
      <div className="mb-8">
        <div className="text-xs font-medium tracking-wide text-neutral-400">HOME / ADD RECIPE</div>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-neutral-900">ADD RECIPE</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-500">
          Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us.
        </p>
      </div>

      {refsError ? (
        <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {refsError}
        </div>
      ) : null}

      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-10 lg:grid-cols-[420px_1fr]">
        {/* LEFT: Upload */}
        <div>
          <div
            className={[
              "rounded-3xl border-2 border-dashed p-6 transition",
              isDragging ? "border-neutral-400 bg-neutral-50" : "border-neutral-200 bg-white",
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

            <div className="flex min-h-[360px] flex-col items-center justify-center">
              {!thumb ? (
                <>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-neutral-200 bg-white shadow-sm">
                    <svg className="h-5 w-5 text-neutral-400">
                      <use href="/sprite.svg#icon-camera" />
                    </svg>
                  </div>

                  <button
                    type="button"
                    className="mt-4 text-sm font-medium text-neutral-700 underline underline-offset-4 hover:text-neutral-900"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Upload a photo
                  </button>

                  <div className="mt-2 text-xs text-neutral-400">or drag & drop</div>
                </>
              ) : (
                <div className="w-full">
                  <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
                    <img src={previewUrl} alt="Thumb preview" className="h-[320px] w-full object-cover" />
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-neutral-900">{thumb.name}</div>
                      <div className="text-xs text-neutral-500">
                        {(thumb.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="light"
                      label="Remove"
                      onClick={removeThumb}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT: Fields */}
        <div className="space-y-8">
          {/* Title */}
          <div>
            <div className="mb-4 text-xl font-bold leading-none text-neutral-900">THE NAME OF THE RECIPE</div>

            <TextInput
              id="title"
              name="title"
              value={form.title}
              onChange={onFieldChange}
              placeholder="Enter the name"
              maxLength={100}
              disabled={isSubmitting}
            />
          </div>

          {/* Category + Cooking time */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div>
              <div className="mb-4 text-xl font-bold leading-none text-neutral-900">CATEGORY</div>
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
              <div className="mb-4 text-xl font-bold leading-none text-neutral-900">COOKING TIME</div>

              <div className="mx-2 flex items-center gap-4">
                <button
                  type="button"
                  onClick={decTime}
                  disabled={isSubmitting}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-lg hover:bg-neutral-50 disabled:opacity-60"
                >
                  −
                </button>

                <div className="text-sm text-neutral-500">
                  <span className="font-semibold text-neutral-900">{form.cookingTimeMin}</span> min
                </div>

                <button
                  type="button"
                  onClick={incTime}
                  disabled={isSubmitting}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 bg-white text-lg hover:bg-neutral-50 disabled:opacity-60"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Area */}
          <div>
            <div className="mb-4 text-xl font-bold leading-none text-neutral-900">AREA</div>
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
            <div className="mb-4 text-xl font-bold leading-none text-neutral-900">INGREDIENTS</div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_220px]">
              <SelectField
                id="ingredientId"
                name="ingredientId"
                value={ingredientDraft.ingredientId}
                onChange={onDraftChange}
                options={ingredientOptions}
                placeholder={isLoadingRefs ? "Loading..." : "Add the ingredient"}
                disabled={isLoadingRefs || isSubmitting}
              />

              <TextInput
                id="measure"
                name="measure"
                value={ingredientDraft.measure}
                onChange={onDraftChange}
                placeholder="Enter quantity"
                maxLength={60}
                disabled={isSubmitting}
              />
            </div>

            <div className="mx-2 mt-3">
              <Button
                type="button"
                variant="light"
                label="ADD INGREDIENT +"
                onClick={addIngredient}
                disabled={isLoadingRefs || isSubmitting}
              />
            </div>

        {ingredients.length > 0 && (
          <div className="mx-2 mt-6 flex flex-wrap gap-4">
            {ingredients.map((ing, idx) => (
              <div
                key={`${ing.ingredientId}-${idx}`}
                className="relative flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-3"
              >
                {/* remove X */}
                <button
                  type="button"
                  onClick={() => removeIngredientAt(idx)}
                  disabled={isSubmitting}
                  className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-500 shadow-sm hover:bg-neutral-50 disabled:opacity-60"
                  aria-label="Remove ingredient"
                  title="Remove"
                >
                  ×
                </button>

                {/* image */}
                <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
                  {ing.img ? (
                    <img src={ing.img} alt={ing.label} className="h-full w-full object-cover" />
                  ) : (
                    <div className="text-xs text-neutral-400">No image</div>
                  )}
                </div>

                {/* text */}
                <div className="min-w-[90px]">
                  <div className="text-sm font-medium text-neutral-900">{ing.label}</div>
                  <div className="text-xs text-neutral-400">{ing.measure}</div>
                </div>
              </div>
            ))}
          </div>
        )}
          </div>

          {/* Instructions */}
          <div>
            <div className="mb-4 text-xl font-bold leading-none text-neutral-900">RECIPE PREPARATION</div>
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
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {submitError}
            </div>
          ) : null}

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={clearAll}
              disabled={isSubmitting}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-neutral-200 bg-white hover:bg-neutral-50 disabled:opacity-60"
              aria-label="Clear form"
              title="Clear"
            >
              <svg className="h-5 w-5">
                <use href="/sprite.svg#icon-trash" />
              </svg>
            </button>

            <Button
              type="submit"
              variant="dark"
              label={isSubmitting ? "PUBLISHING..." : "PUBLISH"}
              disabled={isSubmitting || isLoadingRefs}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
