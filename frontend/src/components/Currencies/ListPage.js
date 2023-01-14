import Currency from "./single_currency";

const ListPage = ({ searchResults }) => {
  const results = searchResults.map((currency) => (
    <Currency
      key={currency._id}
      c_name={currency.currency}
      slug={currency.slug}
      mid={currency.mid}
      date={currency.effectiveDate}
      code={currency.code}
    />
  ));

  const content = results?.length ? (
    results
  ) : (
    <article>
      <p>No Matching Posts</p>
    </article>
  );

  return <main>{content}</main>;
};
export default ListPage;
