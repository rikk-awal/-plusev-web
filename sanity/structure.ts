import type { StructureResolver } from "sanity/structure";
import { Settings } from "lucide-react";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content Management")
    .items([
      S.listItem()
        .title("⚙️ Site Settings")
        .icon(Settings)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !["siteSettings", "media.tag"].includes(listItem.getId() || "")
      ),
    ]);
