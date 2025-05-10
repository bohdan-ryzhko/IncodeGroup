import { PickerModal } from 'components';
import { DELETE } from 'consts';
import { useReduxStore } from 'hooks';
import { Categories } from 'interfaces';
import { Dispatch, FC, SetStateAction, useMemo, useState } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { styles } from './styles';

type Props = {
  filterValue: Categories | null;
  setFilterValue: Dispatch<SetStateAction<Categories | null>>;
};

export const CategoriesFilter: FC<Props> = ({
  filterValue,
  setFilterValue,
}) => {
  const { categories } = useReduxStore();
  const [visible, setVisible] = useState(false);

  const options = useMemo(
    () => [...categories.data, DELETE],
    [categories.data],
  );

  return (
    <View style={styles.container}>
      <Button onPress={() => setVisible(true)}>
        {filterValue ? `Filter by: ${filterValue}` : 'Select filter'}
      </Button>

      <PickerModal
        visible={visible}
        onClose={() => setVisible(false)}
        options={options}
        onConfirm={value =>
          value === DELETE
            ? setFilterValue(null)
            : setFilterValue(value as Categories)
        }
      />
    </View>
  );
};
